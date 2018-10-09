// POST /requests/{requestId}/markLent

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    var requestsTable = 'Requests';
    var itemsTable = 'Items';
    
    console.log(event);
    
    var username = event.requestContext.authorizer.claims['cognito:username'];
    var email = event.requestContext.authorizer.claims['email'];
    var reqId = event.pathParameters.requestId;
    
    var currentTime = Date.now();
    
    var returnRequest = [];
        
    var reqParams = {
        TableName: requestsTable,
        Key : {
            RequestId : reqId
        },
        UpdateExpression : "set itemLent = :true, itemAvailable = :false, borrowStartTime = :now",
        ConditionExpression : "requester = :user AND requestApproved = :true AND itemLent = :false AND itemAvailable = :true",
        ExpressionAttributeValues : { ':user' : username, ':true' : true, ':false' : false, ':now' : currentTime },
        ReturnValues: "ALL_NEW"
    };
        
    // Update the Request and return the updated object
    ddb.update(reqParams, function(err, data) {
        console.log("UPDATING REQUEST");
        if(err) {
            console.log(err, err.stack);
	        var response = {
                statusCode: 400,
                body: JSON.stringify(err)
            };
            callback(null, response);
        }
        else {
            returnRequest = data.Attributes;
            console.log(returnRequest);
            var statCode = 200;
            
            if(returnRequest == undefined){
                statCode = 400;
                returnRequest = {};
            }
            else {
                var itemParams = {
                    TableName: itemsTable,
                    Key : {
                        ItemId : returnRequest.ItemId
                    },
                    UpdateExpression : "set available = :false, currentBorrower = :user, currentBorrowerEmail = :userEmail",
                    ExpressionAttributeValues : { ':user' : username, ':userEmail' : email, ':false' : false }
                };
                
                 ddb.update(itemParams, function(err, data) {
                    console.log("UPDATING ITEM");
                    if(err) {
                        console.log(err, err.stack);
                    }
                 });
            }
            var response = {
                statusCode: statCode,
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