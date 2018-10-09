// GET /reviews?type=(LEND||BORROW)

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
    var reviewTable = "Reviews";
    var username = event.requestContext.authorizer.claims['cognito:username'];
    var TYPE = event.queryStringParameters['type'];
    
    if(!(TYPE === "LEND" || TYPE === "BORROW")) {
        var error = {message : "Bad value for parameter: type"}
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
    else{
        var reviewParams = {
            TableName : reviewTable,
            FilterExpression : "reviewer = :reviewer AND attribute_not_exists(rating) AND reviewType = :type",
            ExpressionAttributeValues : {
                ":reviewer" : username,
                ":type"     : TYPE
            }
        }
        
        ddb.scan(reviewParams, function(err, data) {
           if(err) {
               console.log(err);
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
               console.log("Success!");
               console.log(data.Items);
               var response = {
                   statusCode: 200,
                   headers : {
                       "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                       
                   },
                   body : JSON.stringify(data.Items)
               };
               callback(null, response);
           }
        });
    }
};
