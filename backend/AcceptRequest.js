// POST /requests/{requestId}/approve

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    var requestsTable = 'Requests';
    
    console.log(event);
    
    var username   = event.requestContext.authorizer.claims['cognito:username'];
    var reqId = event.pathParameters.requestId;
    var returnRequest = [];
        
    var reqParams = {
        TableName: requestsTable,
        Key : {
            RequestId : reqId
        },
        UpdateExpression : "set requestApproved = :true",
        ConditionExpression : "ownerUser = :owner AND requestApproved = :false",
        ExpressionAttributeValues : { ':owner' : username, ':true' : true, ':false' : false }
    };
        
    // Update the Request and return the updated object
    ddb.update(reqParams, function(err, data) {
        if(err) {
            console.log(err, err.stack);
            var error = { message : err }
	        var response = {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                },
                body: JSON.stringify(error)
            };
            callback(null, response);
        }
        else {
            returnRequest = data.Item;
            
            var response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                },
                body: JSON.stringify(returnRequest)
            };
            callback(null, response);
        }
    });
};