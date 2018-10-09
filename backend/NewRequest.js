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
    
    var itemParams = {
    	TableName: 'Items',
    	Key: {
    		ItemId: body.ItemId
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
    	    var response = {
		        statusCode: 404,
		        headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                },
		        body: JSON.stringify(returnItem)
			};
			callback(null, response);
			return;
    	}
    	
    	var newRequest = {
            RequestId : newId,
            ItemId : data.Item.ItemId,
            itemAvailable : data.Item.available,
            condition : data.Item.condition,
            itemDescription : data.Item.description,
            ownerEmail : data.Item.ownerEmail,
            ownerUser : data.Item.ownerUser,
            itemImage : data.Item.image,
            itemTitle : data.Item.title,
            requester : username,
            requesterEmail : email,
            requestApproved : false,
            itemLent : false,
            itemReturned : false
        };
    
        var reqParams = {
        	TableName: 'Requests',
        	Item : newRequest
        }
        
        ddb.put(reqParams, function(err, data){
        	console.log('CREATING REQUEST');
        	var statCode = 201;
        	var createdRequest = data.Item;
        	
        	if (err) {
        		console.log(err, err.stack);
        		statCode = 405;
        		createdRequest = {message : err};
        	}
        	
        	if(createdRequest == undefined){
        	    createdRequest = {RequestId : newId};
        	}
        	
        	var response = {
        	    statusCode : statCode,
        	    headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                },
        	    body : JSON.stringify(createdRequest)
        	};
        	
    		callback(null, response);
        });
    	
    	
    	
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
