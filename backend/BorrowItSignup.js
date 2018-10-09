var AWS = require("aws-sdk");
var ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context) {
    var error;
    var userTable = "Users";
    var Credentials = {
        TableName: userTable,
        Item: { 
            "username"          : "",
            "emailAddress"      : "",
            "borrowRep"         : 0,
            "creationDate"      : Date.now(),
            "itemsBorrowed"     : 0,
            "itemsLent"         : 0, 
            "lendRep"           : 0,
            "profilePic"        : "#",
            "totalBorrowRatings" : 0,
            "totalLendRatings"   : 0
        }
    };
    
    // Impose a condition that the minimum length of the username of 5 is imposed on all user pools.
    if(!isValid(event.userName)){
        error = new Error('Username cannot contain special characters');
        context.done(error, event);
    }
    
    if (event.userName.length < 5) {
        error = new Error('Username is too short');
        context.done(error, event);
    }
    
    // Make sure the user has a cnu.edu email address.
    else if(!event.request.userAttributes.email.endsWith("@cnu.edu")){
        error = new Error('Invalid email address');
        context.done(error, event);
    }
    
    // Update Credentials to include the username and emailAddress params.
    Credentials.Item.username = event.userName;
    Credentials.Item.emailAddress = event.request.userAttributes.email;
    
    ddb.put(Credentials, function(err, data) {
       console.log("ADDING USER to DDB");
       if(err) {
            console.log(err);
       } else {
            console.log("Successfully added item: ", JSON.stringify(Credentials));
            context.done(null, event);
       }
    });
};

function isValid(str){
 return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}