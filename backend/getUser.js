const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    var usersTable = 'Users';
    
    var user = {};
        
    var reqParams = {
        TableName: usersTable,
        Key: {
    		username: event.pathParameters.userId
    	}
    };
        
    // Get list of current items you have up for lending:
    ddb.get(reqParams, function(err, data) {
        if(err) {
            console.log(err, err.stack);
	        var response = {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                },
                body: ''
            };
            callback(null, response);
        }
        else {
            
            console.log("GOT USER");
            console.log(data.Item);
            user = data.Item;
            var statCode = 200;
            if(user == undefined){
                statCode = 404;
                user = {};
            }
            
            var response = {
                statusCode: statCode,
                headers: {
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
                },
                body: JSON.stringify(user)
            };
            callback(null, response);
        }
    });
};