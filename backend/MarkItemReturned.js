// POST /requests/{requestId}/markReturned

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
        UpdateExpression : "set itemReturned = :true, returnedTime = :now",
        ConditionExpression : "ownerUser = :user AND itemLent = :true",
        ExpressionAttributeValues : { ':user' : username, ':true' : true, ':now' : currentTime },
        ReturnValues: "ALL_NEW"
    };
        
    // Update the Request and return the updated object
    ddb.update(reqParams, function(err, data) {
        console.log("UPDATING REQUEST");
        if(err) {
            console.log(err, err.stack);
	        var response = {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                },
                body: JSON.stringify(err)
            };
            callback(null, response);
        }
        else {
            returnRequest = data.Attributes;
            var statCode = 200;
            
            if(returnRequest == undefined){
                statCode = 400;
                returnRequest = {};
            }
            else{
                var itemParams = {
                    TableName: itemsTable,
                    Key : {
                        ItemId : returnRequest.ItemId
                    },
                    UpdateExpression : "set available = :true remove currentBorrower, currentBorrowerEmail",
                    ExpressionAttributeValues : { ':true' : true }
                };
            
                ddb.update(itemParams, function(err, data) {
                    console.log("UPDATING ITEM");
                    if(err) {
                        console.log(err, err.stack);
                    }
                });
                var reviewTable = "Reviews";
                
                var reviewParamsBorrower = {
                    TableName : reviewTable,
                    Item : {
                        ReviewId : generateUuid(),
                        RequestId : returnRequest.RequestId,
                        ItemId    : returnRequest.ItemId,
                        recipient : returnRequest.ownerUser,
                        reviewer : returnRequest.requester,
                        reviewType : "LEND",
                        itemTitle : returnRequest.itemTitle,
                        itemImage : returnRequest.itemImage,
                        borrowDuration : returnRequest.returnedTime - returnRequest.borrowStartTime
                    }
                };
                var reviewParamsLender   = {
                    TableName: reviewTable,
                    Item : {
                        ReviewId : generateUuid(),
                        RequestId : returnRequest.RequestId,
                        ItemId    : returnRequest.ItemId,
                        recipient : returnRequest.requester,
                        reviewer : returnRequest.ownerUser,
                        reviewType : "BORROW",
                        itemTitle : returnRequest.itemTitle,
                        itemImage : returnRequest.itemImage,
                        borrowDuration : returnRequest.returnedTime - returnRequest.borrowStartTime
                    }
                };
                
                ddb.put(reviewParamsBorrower, function(err, data){
                   if(err){
                       console.log(err);
                   } 
                });
                
                ddb.put(reviewParamsLender, function(err, data){
                    if(err){
                        console.log(err);
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