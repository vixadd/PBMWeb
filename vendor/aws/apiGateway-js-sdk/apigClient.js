/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://61j5x587p0.execute-api.us-east-1.amazonaws.com/Prod';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.itemsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var itemsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/items').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(itemsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.itemsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var itemsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/items').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(itemsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.itemsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var itemsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/items').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(itemsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.itemsBorrowingGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var itemsBorrowingGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/items/borrowing').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(itemsBorrowingGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.itemsBorrowingOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var itemsBorrowingOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/items/borrowing').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(itemsBorrowingOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.itemsLendingGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var itemsLendingGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/items/lending').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(itemsLendingGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.itemsLendingOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var itemsLendingOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/items/lending').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(itemsLendingOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.itemsItemIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['itemId'], ['body']);
        
        var itemsItemIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/items/{itemId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['itemId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(itemsItemIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.itemsItemIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var itemsItemIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/items/{itemId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(itemsItemIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.requestsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var requestsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/requests').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(requestsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.requestsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var requestsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/requests').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(requestsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.requestsBorrowGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var requestsBorrowGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/requests/borrow').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(requestsBorrowGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.requestsBorrowOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var requestsBorrowOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/requests/borrow').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(requestsBorrowOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.requestsLendGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var requestsLendGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/requests/lend').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(requestsLendGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.requestsLendOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var requestsLendOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/requests/lend').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(requestsLendOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.requestsRequestIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var requestsRequestIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/requests/{requestId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(requestsRequestIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.requestsRequestIdApprovePost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['requestId'], ['body']);
        
        var requestsRequestIdApprovePostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/requests/{requestId}/approve').expand(apiGateway.core.utils.parseParametersToObject(params, ['requestId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(requestsRequestIdApprovePostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.requestsRequestIdApproveOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var requestsRequestIdApproveOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/requests/{requestId}/approve').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(requestsRequestIdApproveOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.requestsRequestIdMarkLentPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['requestId'], ['body']);
        
        var requestsRequestIdMarkLentPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/requests/{requestId}/markLent').expand(apiGateway.core.utils.parseParametersToObject(params, ['requestId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(requestsRequestIdMarkLentPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.requestsRequestIdMarkLentOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var requestsRequestIdMarkLentOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/requests/{requestId}/markLent').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(requestsRequestIdMarkLentOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.requestsRequestIdMarkReturnedPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['requestId'], ['body']);
        
        var requestsRequestIdMarkReturnedPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/requests/{requestId}/markReturned').expand(apiGateway.core.utils.parseParametersToObject(params, ['requestId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(requestsRequestIdMarkReturnedPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.requestsRequestIdMarkReturnedOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var requestsRequestIdMarkReturnedOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/requests/{requestId}/markReturned').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(requestsRequestIdMarkReturnedOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reviewsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['type'], ['body']);
        
        var reviewsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/reviews').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['type']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reviewsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reviewsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reviewsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/reviews').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reviewsPostRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.reviewsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var reviewsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/reviews').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(reviewsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersUserIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['userId'], ['body']);
        
        var usersUserIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/users/{userId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersUserIdGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersUserIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usersUserIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/{userId}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersUserIdOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersUserIdItemsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['userId'], ['body']);
        
        var usersUserIdItemsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/users/{userId}/items').expand(apiGateway.core.utils.parseParametersToObject(params, ['userId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersUserIdItemsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.usersUserIdItemsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var usersUserIdItemsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/users/{userId}/items').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(usersUserIdItemsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
