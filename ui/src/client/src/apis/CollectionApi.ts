// tslint:disable
// eslint-disable
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


import * as runtime from '../runtime';
import {
    CollectionCancelNotFoundResponseBody,
    CollectionCancelNotFoundResponseBodyFromJSON,
    CollectionCancelNotFoundResponseBodyToJSON,
    CollectionCancelNotRunningResponseBody,
    CollectionCancelNotRunningResponseBodyFromJSON,
    CollectionCancelNotRunningResponseBodyToJSON,
    CollectionDeleteNotFoundResponseBody,
    CollectionDeleteNotFoundResponseBodyFromJSON,
    CollectionDeleteNotFoundResponseBodyToJSON,
    CollectionListResponseBody,
    CollectionListResponseBodyFromJSON,
    CollectionListResponseBodyToJSON,
    CollectionRetryNotFoundResponseBody,
    CollectionRetryNotFoundResponseBodyFromJSON,
    CollectionRetryNotFoundResponseBodyToJSON,
    CollectionRetryNotRunningResponseBody,
    CollectionRetryNotRunningResponseBodyFromJSON,
    CollectionRetryNotRunningResponseBodyToJSON,
    CollectionShowNotFoundResponseBody,
    CollectionShowNotFoundResponseBodyFromJSON,
    CollectionShowNotFoundResponseBodyToJSON,
    CollectionShowResponseBody,
    CollectionShowResponseBodyFromJSON,
    CollectionShowResponseBodyToJSON,
    CollectionWorkflowNotFoundResponseBody,
    CollectionWorkflowNotFoundResponseBodyFromJSON,
    CollectionWorkflowNotFoundResponseBodyToJSON,
    CollectionWorkflowResponseBody,
    CollectionWorkflowResponseBodyFromJSON,
    CollectionWorkflowResponseBodyToJSON,
} from '../models';

export interface CollectionCancelRequest {
    id: number;
}

export interface CollectionDeleteRequest {
    id: number;
}

export interface CollectionListRequest {
    originalId?: string;
    cursor?: string;
}

export interface CollectionRetryRequest {
    id: number;
}

export interface CollectionShowRequest {
    id: number;
}

export interface CollectionWorkflowRequest {
    id: number;
}

/**
 * no description
 */
export class CollectionApi extends runtime.BaseAPI {

    /**
     * Cancel collection processing by ID
     * cancel collection
     */
    async collectionCancelRaw(requestParameters: CollectionCancelRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling collectionCancel.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/collection/{id}/cancel`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Cancel collection processing by ID
     * cancel collection
     */
    async collectionCancel(requestParameters: CollectionCancelRequest): Promise<void> {
        await this.collectionCancelRaw(requestParameters);
    }

    /**
     * Delete collection by ID
     * delete collection
     */
    async collectionDeleteRaw(requestParameters: CollectionDeleteRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling collectionDelete.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/collection/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete collection by ID
     * delete collection
     */
    async collectionDelete(requestParameters: CollectionDeleteRequest): Promise<void> {
        await this.collectionDeleteRaw(requestParameters);
    }

    /**
     * List all stored collections
     * list collection
     */
    async collectionListRaw(requestParameters: CollectionListRequest): Promise<runtime.ApiResponse<CollectionListResponseBody>> {
        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.originalId !== undefined) {
            queryParameters['original_id'] = requestParameters.originalId;
        }

        if (requestParameters.cursor !== undefined) {
            queryParameters['cursor'] = requestParameters.cursor;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/collection`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CollectionListResponseBodyFromJSON(jsonValue));
    }

    /**
     * List all stored collections
     * list collection
     */
    async collectionList(requestParameters: CollectionListRequest): Promise<CollectionListResponseBody> {
        const response = await this.collectionListRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retry collection processing by ID
     * retry collection
     */
    async collectionRetryRaw(requestParameters: CollectionRetryRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling collectionRetry.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/collection/{id}/retry`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Retry collection processing by ID
     * retry collection
     */
    async collectionRetry(requestParameters: CollectionRetryRequest): Promise<void> {
        await this.collectionRetryRaw(requestParameters);
    }

    /**
     * Show collection by ID
     * show collection
     */
    async collectionShowRaw(requestParameters: CollectionShowRequest): Promise<runtime.ApiResponse<CollectionShowResponseBody>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling collectionShow.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/collection/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CollectionShowResponseBodyFromJSON(jsonValue));
    }

    /**
     * Show collection by ID
     * show collection
     */
    async collectionShow(requestParameters: CollectionShowRequest): Promise<CollectionShowResponseBody> {
        const response = await this.collectionShowRaw(requestParameters);
        return await response.value();
    }

    /**
     * Retrieve workflow status by ID
     * workflow collection
     */
    async collectionWorkflowRaw(requestParameters: CollectionWorkflowRequest): Promise<runtime.ApiResponse<CollectionWorkflowResponseBody>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling collectionWorkflow.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/collection/{id}/workflow`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => CollectionWorkflowResponseBodyFromJSON(jsonValue));
    }

    /**
     * Retrieve workflow status by ID
     * workflow collection
     */
    async collectionWorkflow(requestParameters: CollectionWorkflowRequest): Promise<CollectionWorkflowResponseBody> {
        const response = await this.collectionWorkflowRaw(requestParameters);
        return await response.value();
    }

}
