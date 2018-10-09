const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    
    var requestsTable = 'Requests';
    
    var username   = event.requestContext.authorizer.claims['cognito:username'];
    var returnItems = {};
        
    var reqParams = {
        TableName: requestsTable,
        FilterExpression : "requester = :requester AND itemLent = :itemLent AND itemReturned = :itemReturned",
        ExpressionAttributeValues : { 
            ':requester' : username,
            ':itemLent' : true,
            ':itemReturned' : false
        }
    }
        
    // Get list of current items requests for borrowing
    ddb.scan(reqParams, function(err, data) {
        if(err) {
            console.log(err, err.stack);
	        callback(err, null);
        } else {
            returnItems = data.Items;
            
            var response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                },
                body: JSON.stringify(returnItems)
            }
            callback(null, response);
        }
    });
};