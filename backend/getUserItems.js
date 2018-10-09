const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

// Get list of items offered by a specific user
exports.handler = (event, context, callback) => {
    var itemsTable = 'Items';
    
    var username = event.pathParameters.userId;
    
    var returnItems = [];
        
    var reqParams = {
        TableName: itemsTable,
        FilterExpression : "available = :true AND ownerUser = :user",
        ExpressionAttributeValues : { ':true' : true, ':user' : username }
    };
        
    
    ddb.scan(reqParams, function(err, data) {
        if(err) {
            console.log(err, err.stack);
	        var response = {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                },
                body: ''
            };
            callback(null, response);
        }
        else {
            returnItems = data.Items;
            
            returnItems.forEach(function(item){
               delete item.ownerEmail;
            });
            
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