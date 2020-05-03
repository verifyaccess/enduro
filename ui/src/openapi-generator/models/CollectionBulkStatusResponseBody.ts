/* tslint:disable */
/* eslint-disable */
/**
 * Enduro API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CollectionBulkStatusResponseBody
 */
export interface CollectionBulkStatusResponseBody {
    /**
     * 
     * @type {Date}
     * @memberof CollectionBulkStatusResponseBody
     */
    closedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof CollectionBulkStatusResponseBody
     */
    runId?: string;
    /**
     * 
     * @type {boolean}
     * @memberof CollectionBulkStatusResponseBody
     */
    running: boolean;
    /**
     * 
     * @type {Date}
     * @memberof CollectionBulkStatusResponseBody
     */
    startedAt?: Date;
    /**
     * 
     * @type {string}
     * @memberof CollectionBulkStatusResponseBody
     */
    status?: string;
    /**
     * 
     * @type {string}
     * @memberof CollectionBulkStatusResponseBody
     */
    workflowId?: string;
}

export function CollectionBulkStatusResponseBodyFromJSON(json: any): CollectionBulkStatusResponseBody {
    return CollectionBulkStatusResponseBodyFromJSONTyped(json, false);
}

export function CollectionBulkStatusResponseBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): CollectionBulkStatusResponseBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'closedAt': !exists(json, 'closed_at') ? undefined : (new Date(json['closed_at'])),
        'runId': !exists(json, 'run_id') ? undefined : json['run_id'],
        'running': json['running'],
        'startedAt': !exists(json, 'started_at') ? undefined : (new Date(json['started_at'])),
        'status': !exists(json, 'status') ? undefined : json['status'],
        'workflowId': !exists(json, 'workflow_id') ? undefined : json['workflow_id'],
    };
}

export function CollectionBulkStatusResponseBodyToJSON(value?: CollectionBulkStatusResponseBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'closed_at': value.closedAt === undefined ? undefined : (value.closedAt.toISOString()),
        'run_id': value.runId,
        'running': value.running,
        'started_at': value.startedAt === undefined ? undefined : (value.startedAt.toISOString()),
        'status': value.status,
        'workflow_id': value.workflowId,
    };
}

