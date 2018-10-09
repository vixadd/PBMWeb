const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    var itemsTable = 'Items';
    
    var returnItems = [];
        
    var reqParams = {
        TableName: itemsTable,
        FilterExpression : "available = :true",
        ExpressionAttributeValues : { ':true' : true }
    };
        
    // Get list of current items you have up for lending:
    ddb.scan(reqParams, function(err, data) {
        if(err) {
            console.log(err, err.stack);
	        var response = {
                statusCode: 400,
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