// Gets called whenever an update to the Reviews table occurs. If a rating is included, it adds it to a user's reputation.
'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
console.log('Loading function');

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    var usersTable = "Users";
    
    event.Records.forEach((record) => {
        if (record.eventName == "MODIFY" && record.dynamodb.NewImage.rating != null){
            var rating = parseInt(record.dynamodb.NewImage.rating.N);
            rating = clamp(rating, 1, 5);
            
            var updateStatement = "set borrowRep = borrowRep + :rating, totalBorrowRatings = totalBorrowRatings + :one";
            
            if(record.dynamodb.NewImage.reviewType.S == "LEND"){
                updateStatement = "set lendRep = lendRep + :rating, totalLendRatings = totalLendRatings + :one";
            }
            
            var updateParams = {
                TableName: usersTable,
                Key : {
                    username : record.dynamodb.NewImage.recipient.S
                },
                UpdateExpression : updateStatement,
                ExpressionAttributeValues : { ':rating' : rating, ':one' : 1 }
            };
            
            ddb.update(updateParams, function(err, data){
                console.log("UPDATING USER");
               if(err){
                   console.log(err);
               }
            });
        }
    });
    
    callback(null, event);
    
};

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}
