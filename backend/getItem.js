const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    
    var itemParams = {
    	TableName: 'Items',
    	Key: {
    		ItemId: event.pathParameters.itemId
    	}
    }
    
    var returnItem = {};
    
    // Get if getting 1 item by primary key.
    ddb.get(itemParams, function(err, data){
    	console.log('GETTING ITEM');
    	if (err) {
    		console.log(err, err.stack); // an error occurred
    		callback(err, null);
    	}
    	if(data.Item == null || data.Item == undefined || data.Item == {}){
    		returnItem = {};
    		var response = {
		        statusCode: 404,
		        headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                },
		        body: JSON.stringify(returnItem)
			}
			callback(null, response);
			return;
    	}
    	returnItem = data.Item;
    	if(returnItem.currentBorrower){
    		delete returnItem.currentBorrower;
    		delete returnItem.currentBorrowerEmail;
    	}
    	delete returnItem.ownerEmail;
    	
    	getComments(returnItem); // Has to be called here to ensure returnItem is populated.
    });
    
    function getComments(item) {
    	
    	var commentParams = {
			TableName: 'Comments',
			FilterExpression : 'ItemId = :itemId',
			ExpressionAttributeValues : {':itemId': item.ItemId}
		}
	
		// Scan if getting multiple items and filtering by non-primary key.
		ddb.scan(commentParams, function(err, data){
			console.log("GETTING COMMENTS");
			if (err) {
	    		console.log(err, err.stack); // an error occurred
	    		callback(err, null);
	    	}
	    	
	    	returnItem.comments = data.Items;
	    	
	    	var response = {
		        statusCode: 200,
		        headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                },
		        body: JSON.stringify(returnItem)
			}
			callback(null, response);
		});
    }
};
