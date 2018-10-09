// Gets called whenever an update to the Requests table occurs.
// Updates the number of lent/borrowed items for Users.
'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
console.log('Loading function');

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    var usersTable = "Users";
    
    event.Records.forEach((record) => {
        
        // If the item has been returned, update the two users' running total of items lent/borrowed
        
        if (record.eventName == "MODIFY" && record.dynamodb.NewImage.itemReturned.BOOL){
            
            
            var borrowerUpdateStatement = "set itemsBorrowed = itemsBorrowed + :one";
            var borrower = record.dynamodb.NewImage.requester.S;
            
            var attributeValues = { ':one' : 1 };
            
            var borrowerUpdateParams = {
                TableName: usersTable,
                Key : {
                    username : borrower
                },
                UpdateExpression : borrowerUpdateStatement,
                ExpressionAttributeValues : attributeValues
            };
            
            var lenderUpdateStatement = "set itemsLent = itemsLent + :one";
            var lender = record.dynamodb.NewImage.ownerUser.S;
            
            var lenderUpdateParams = {
                TableName: usersTable,
                Key : {
                    username : lender
                },
                UpdateExpression : lenderUpdateStatement,
                ExpressionAttributeValues : attributeValues
            };
            
            ddb.update(borrowerUpdateParams, function(err, data){
                console.log("UPDATING BORROWER USER");
               if(err){
                   console.log(err);
               }
            });
            
            ddb.update(lenderUpdateParams, function(err, data){
                console.log("UPDATING LENDER USER");
               if(err){
                   console.log(err);
               }
            });
        }
    });
    
    callback(null, event);
    
};
