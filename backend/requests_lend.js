const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    
    var requestsTable = "Requests";
    var username = event.requestContext.authorizer.claims['cognito:username'];
    console.log(username);
    var returnRequests = {};
    
    var reqParams = {
        TableName: requestsTable,
        FilterExpression : "ownerUser = :ownerUser AND itemLent = :itemLent",
        ExpressionAttributeValues : { 
            ':ownerUser' : username, 
            ':itemLent'  : false
        }
    }
    
    // Get all requests for lending for the user
    // that havent been fullfilled yet.
    ddb.scan(reqParams, function(err, data) {
        if(err) {
            console.log(err, err.stack);
	        callback(err, null);
        } else {
            data.Items.forEach(function(obj) {
                if (!obj.requestApproved) {
                    delete obj.requesterEmail;
                    delete obj.ownerEmail;
                }
            });
            
            returnRequests = data.Items;
            
            var response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                },
                body: JSON.stringify(returnRequests)
            }
            callback(null, response);
        }
    });
    
};