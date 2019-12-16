package activities

import (
	"context"
	"crypto/md5"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/artefactual-labs/enduro/internal/collection"
	wferrors "github.com/artefactual-labs/enduro/internal/workflow/errors"
	"github.com/artefactual-labs/enduro/internal/workflow/manager"
)

// Similar to time.RFC3339 with dashes and colons removed.
const rfc3339forFilename = "20060102.150405.999999999"

// UpdateProductionSystemActivity sends a receipt to the production system
// using their filesystem interface using GoAnywhere.
type UpdateProductionSystemActivity struct {
	manager *manager.Manager
}

func NewUpdateProductionSystemActivity(m *manager.Manager) *UpdateProductionSystemActivity {
	return &UpdateProductionSystemActivity{manager: m}
}

type UpdateProductionSystemActivityParams struct {
	OriginalID   string
	Kind         string
	StoredAt     time.Time
	PipelineName string
	Status       collection.Status
}

func (a *UpdateProductionSystemActivity) Execute(ctx context.Context, params *UpdateProductionSystemActivityParams) error {
	if params.OriginalID == "" {
		return wferrors.NonRetryableError(errors.New("OriginalID is missing or empty"))
	}

	var err error
	params.Kind, err = convertKind(params.Kind)
	if err != nil {
		return wferrors.NonRetryableError(fmt.Errorf("error validating kind attribute: %v", err))
	}

	// We expect tinfo.StoredAt to have the zero value when the ingestion
	// has failed. Here we set a new value as it is a required field.
	if params.StoredAt.IsZero() {
		params.StoredAt = time.Now().UTC()
	}

	receiptPath, err := manager.HookAttrString(a.manager.Hooks, "prod", "receiptPath")
	if err != nil {
		return wferrors.NonRetryableError(fmt.Errorf("error looking up receiptPath configuration attribute: %v", err))
	}

	var basename = filepath.Join(receiptPath, fmt.Sprintf("Receipt_%s_%s", params.OriginalID, params.StoredAt.Format(rfc3339forFilename)))

	// Create and open receipt file.
	file, err := os.OpenFile(basename+".json", os.O_RDWR|os.O_CREATE, os.FileMode(0o644))
	if err != nil {
		return wferrors.NonRetryableError(fmt.Errorf("error creating receipt file: %v", err))
	}

	// Write receipt contents.
	if err := a.generateReceipt(params, file); err != nil {
		return wferrors.NonRetryableError(fmt.Errorf("error writing receipt file: %v", err))
	}

	// Seek to the beginning of the file.
	if _, err = file.Seek(0, io.SeekStart); err != nil {
		return wferrors.NonRetryableError(fmt.Errorf("error resetting receipt file cursor: %v", err))
	}

	// Create checksum file with ".md5" extension instead of ".json" extension.
	if err := a.generateChecksum(file, basename+".md5"); err != nil {
		return wferrors.NonRetryableError(fmt.Errorf("error writing checksum file: %v", err))
	}

	_ = file.Close()

	// Final rename.
	if err := os.Rename(basename+".json", basename+".mft"); err != nil {
		return wferrors.NonRetryableError(fmt.Errorf("error renaming receipt (json » mft): %v", err))
	}

	return nil
}

func (a UpdateProductionSystemActivity) generateReceipt(params *UpdateProductionSystemActivityParams, file *os.File) error {
	var accepted bool
	var message string

	if params.Status == collection.StatusDone {
		accepted = true
		message = fmt.Sprintf("Package was processed by Archivematica pipeline %s", params.PipelineName)
	} else {
		accepted = false
		message = fmt.Sprintf("Package was not processed successfully")
	}

	receipt := prodSystemReceipt{
		Identifier: params.OriginalID,
		Type:       strings.ToLower(params.Kind),
		Accepted:   accepted,
		Message:    message,
		Timestamp:  params.StoredAt,
	}

	enc := json.NewEncoder(file)
	enc.SetIndent("", "  ")
	if err := enc.Encode(receipt); err != nil {
		return fmt.Errorf("encoding failed: %v", err)
	}

	if err := file.Sync(); err != nil {
		return fmt.Errorf("sync failed: %v", err)
	}

	return nil
}

func (a UpdateProductionSystemActivity) generateChecksum(r io.Reader, path string) error {
	hasher := md5.New()
	if _, err := io.Copy(hasher, r); err != nil {
		return err
	}

	file, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE, os.FileMode(0o644))
	if err != nil {
		return fmt.Errorf("open failed: %v", err)
	}
	defer file.Close()

	if _, err := fmt.Fprintf(file, "%x", hasher.Sum(nil)); err != nil {
		return fmt.Errorf("write failed: %v", err)
	}

	if err := file.Sync(); err != nil {
		return fmt.Errorf("sync failed: %v", err)
	}

	return nil
}

type prodSystemReceipt struct {
	Identifier string    `json:"identifier"` // Original identifier.
	Type       string    `json:"type"`       // Lowercase. E.g. "dpj", "epj", "other" or "avlxml".
	Accepted   bool      `json:"accepted"`   // Whether we have an error during processing.
	Message    string    `json:"message"`    // E.g. "Package was processed by Archivematica pipeline am" or any other error message.
	Timestamp  time.Time `json:"timestamp"`  // RFC3339, e.g. "2006-01-02T15:04:05Z07:00"
}