// POST /items

const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    
    var username = event.requestContext.authorizer.claims['cognito:username'];
    var email = event.requestContext.authorizer.claims['email'];
    var newId = generateUuid();
    
    var body = {};
    
    console.log(event.body);
    
    try{
        body = JSON.parse(event.body);
    }
    catch(e){
        var error = { message : e}
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
    
    
    var newItem = {
        ItemId : newId,
        available : true,
        condition : body.condition,
        description : body.description,
        ownerEmail : email,
        ownerUser : username,
        image : body.image,
        title : body.title  
    };
    
    var itemParams = {
    	TableName: 'Items',
    	Item : newItem
    }
    
    ddb.put(itemParams, function(err, data){
    	console.log('CREATING ITEM');
    	var statCode = 201;
    	var createdItem = data.Item;
    	
    	if (err) {
    		console.log(err, err.stack);
    		statCode = 405;
    		createdItem = {message : err};
    	}
    	
    	if(createdItem == undefined){
    	    createdItem = {ItemId : newId};
    	}
    	
    	var response = {
    	    statusCode : statCode,
    	    headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
            },
    	    body : JSON.stringify(createdItem)
    	};
    	
		callback(null, response);
    });
};

function generateUuid() {
	var totalCharacters = 39; // length of number hash; in this case 0-39 = 40 characters
	var txtUuid = "";
	do {
		var point = Math.floor(Math.random() * 10);
		if (txtUuid.length === 0 && point === 0) {
			do {
				point = Math.floor(Math.random() * 10);
			} while (point === 0);
		}
		txtUuid = txtUuid + point;
	} while ((txtUuid.length - 1) < totalCharacters);
	return txtUuid;
};
