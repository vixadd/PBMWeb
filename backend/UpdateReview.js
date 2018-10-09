// POST /reviews

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    var reviewsTable = 'Reviews';
    var commentsTable = 'Comments';
    
    console.log(event);
    
    var username = event.requestContext.authorizer.claims['cognito:username'];
    var reqId = event.pathParameters.requestId;
    
    var body;
    
    try{
        body = JSON.stringify(event.body);
    }
    catch(e){
        body = {message : e}
        var response = {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
            },
            body: JSON.stringify(body)
        };
        callback(null, response);
    }
        
    var revParams = {
        TableName: reviewsTable,
        Key : {
            ReviewId : body.ReviewId
        },
        UpdateExpression : "set rating = :rating",
        ConditionExpression : "reviewer = :user AND attribute_not_exists(rating)",
        ExpressionAttributeValues : { ':user' : username, ':rating' : body.rating }
    };
        
    // Update the Request and return the updated object
    ddb.update(revParams, function(err, data) {
        console.log("UPDATING REQUEST");
        if(err) {
            console.log(err, err.stack);
	        var response = {
                statusCode: 400,
                body: '{}'
            };
            callback(null, response);
        }
        else {
            var review = data.Item;
            var statCode = 202;
            
            if(review == undefined){
                statCode = 400;
                review = {};
            }
            else {
                if(review.type == "LEND"){
                    var commentParams = {
                        TableName: commentsTable,
                        Item : {
                            CommentId : generateUuid(),
                            ItemId : review.ItemId,
                            comment : body.comment,
                            username : username
                        }
                    };
                    
                     ddb.put(commentParams, function(err, data) {
                        console.log("UPDATING ITEM");
                        if(err) {
                            console.log(err, err.stack);
                        }
                     });
                }
            }
            var response = {
                statusCode: statCode,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                },
                body: {}
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