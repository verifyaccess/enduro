module github.com/artefactual-labs/enduro

go 1.15

require (
	github.com/GeertJohan/go.rice v1.0.1-0.20190430230923-c880e3cd4dd8
	github.com/alicebob/miniredis/v2 v2.13.1
	github.com/anmitsu/go-shlex v0.0.0-20200502080107-070676123096 // indirect
	github.com/atrox/go-migrate-rice v1.0.1
	github.com/aws/aws-sdk-go v1.34.5
	github.com/cenkalti/backoff/v3 v3.2.2
	github.com/daaku/go.zipexe v1.0.1 // indirect
	github.com/dsnet/compress v0.0.1 // indirect
	github.com/frankban/quicktest v1.5.0 // indirect
	github.com/fsnotify/fsnotify v1.4.9
	github.com/go-logr/logr v0.2.0
	github.com/go-logr/zapr v0.2.0
	github.com/go-redis/redis/v7 v7.4.0
	github.com/go-sql-driver/mysql v1.5.0
	github.com/golang-migrate/migrate/v4 v4.12.2
	github.com/golang/mock v1.4.4
	github.com/google/uuid v1.1.1
	github.com/gorilla/schema v1.1.0
	github.com/hashicorp/go-multierror v1.1.0
	github.com/jmoiron/sqlx v1.2.0
	github.com/mholt/archiver v3.1.1+incompatible
	github.com/mitchellh/mapstructure v1.3.3 // indirect
	github.com/nwaples/rardecode v1.1.0 // indirect
	github.com/oklog/run v1.1.0
	github.com/opentracing/opentracing-go v1.2.0 // indirect
	github.com/otiai10/copy v1.2.0
	github.com/pborman/uuid v1.2.1 // indirect
	github.com/pelletier/go-toml v1.8.0 // indirect
	github.com/pierrec/lz4 v2.5.2+incompatible // indirect
	github.com/prometheus/client_golang v1.7.1
	github.com/prometheus/common v0.12.0 // indirect
	github.com/radovskyb/watcher v1.0.7
	github.com/spf13/afero v1.3.4
	github.com/spf13/cast v1.3.1 // indirect
	github.com/spf13/jwalterweatherman v1.1.0 // indirect
	github.com/spf13/pflag v1.0.5
	github.com/spf13/viper v1.7.1
	github.com/stretchr/objx v0.3.0 // indirect
	github.com/stretchr/testify v1.6.1
	github.com/uber-go/tally v3.3.17+incompatible
	github.com/uber/tchannel-go v1.19.1 // indirect
	github.com/ulikunitz/xz v0.5.7 // indirect
	github.com/xi2/xz v0.0.0-20171230120015-48954b6210f8 // indirect
	go.uber.org/cadence v0.13.4
	go.uber.org/thriftrw v1.24.0 // indirect
	go.uber.org/yarpc v1.46.0
	go.uber.org/zap v1.15.0
	goa.design/goa/v3 v3.2.3
	goa.design/plugins/v3 v3.2.3
	gocloud.dev v0.20.0
	golang.org/x/net v0.0.0-20200813134508-3edf25e44fcc // indirect
	golang.org/x/sync v0.0.0-20200625203802-6e8e738ad208
	golang.org/x/sys v0.0.0-20200817155316-9781c653f443 // indirect
	golang.org/x/tools v0.0.0-20200817023811-d00afeaade8f // indirect
	golang.org/x/xerrors v0.0.0-20200804184101-5ec99f83aff1 // indirect
	google.golang.org/genproto v0.0.0-20200815001618-f69a88009b70 // indirect
	google.golang.org/grpc v1.31.0 // indirect
	gopkg.in/ini.v1 v1.60.0 // indirect
	gopkg.in/yaml.v3 v3.0.0-20200615113413-eeeca48fe776 // indirect
	gotest.tools/v3 v3.0.2
	honnef.co/go/tools v0.0.1-2020.1.5 // indirect
)

// "go.uber.org/cadence" requires it but "go mod" selects "v0.12.0".
// I suspect the problem is in that Thrift tags are not using the "v" prefix.
replace github.com/apache/thrift => github.com/apache/thrift v0.0.0-20161221203622-b2a4d4ae21c7
