const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    var requestsTable = 'Requests';
    
    var username   = event.requestContext.authorizer.claims['cognito:username'];
    var returnItems = {};
        
    var reqParams = {
        TableName: requestsTable,
        FilterExpression : "ownerUser = :owner AND itemReturned = :itemReturned AND itemLent = :itemLent",
        ExpressionAttributeValues : { 
            ':owner' : username, 
            ':itemLent' : true,
            ':itemReturned' : false
        }
    };
        
    // Get list of current items you have up for lending:
    ddb.scan(reqParams, function(err, data) {
        if(err) {
            console.log(err, err.stack);
	        var response = {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                },
                body: '{}'
            };
            callback(null, response);
        }
        else {
            returnItems = data.Items;
            
            var response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                },
                body: JSON.stringify(returnItems)
            };
            callback(null, response);
        }
    });
};