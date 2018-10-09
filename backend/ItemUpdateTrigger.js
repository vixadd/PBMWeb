// Gets called whenever an update to the Items table occurs.
// Updates the open Requests for the item with its availability.
'use strict';
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
console.log('Loading function');

exports.handler = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    var requestsTable = "Requests";
    
    event.Records.forEach((record) => {
        
        if (record.eventName == "MODIFY"){
            
            // Start by getting all open Requests for this item
            var itemId = record.dynamodb.NewImage.ItemId.S;
            var available = record.dynamodb.NewImage.available.BOOL;
            
            var reqParams = {
                TableName: requestsTable,
                FilterExpression : "ItemId = :itemId AND itemLent = :false",
                ExpressionAttributeValues : {':itemId' : itemId, ':false' : false }
            };
            
            ddb.scan(reqParams, function(err, data){
               if(err){
                   console.log(err);
               }
               else{
                   var requests = data.Items;
                   console.log(requests);
                   
                   // Update the availability of the item in each Request
                   requests.forEach((request) => {
                      
                      var updateStatement = "set itemAvailable = :available";
                      var requestId = request.RequestId;
                      
                      var attributeValues = {':available' : available};
                      
                      var updateParams = {
                          TableName: requestsTable,
                          Key : {
                              RequestId : requestId
                          },
                          UpdateExpression : updateStatement,
                          ExpressionAttributeValues : attributeValues
                      };
                      
                      ddb.update(updateParams, function(err, data){
                          console.log("UPDATING REQUEST " + request.RequestId);
                          if(err){
                              console.log(err);
                          }
                      });
                   });
               }
            });
        }
    });
    
    callback(null, event);
    
};
