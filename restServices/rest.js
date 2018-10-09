angular.module('BorrowIt')
.factory('RestServices', ['$location', function($location){
	var restServices = {};
	
	var poolData = { 
		UserPoolId : 'us-east-1_2tWi4ARGA', // Your user pool id here
	    ClientId : '1a9tue69nuhci0j7e4t0i83foc' // Your client id here
	};
		
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	var cognitoUser = userPool.getCurrentUser();
	
	var apigClient = apigClientFactory.newClient();
	
	restServices.getItems = function(){
		return apigClient.itemsGet({}, {}, {});
	}
	
	restServices.getItem = function(itemId){
		var params = {
			'itemId' : itemId
		}
		return apigClient.itemsItemIdGet(params, {}, {});
	}
	
	restServices.newItem = function(item){
		cognitoUser = userPool.getCurrentUser();
		var token;
		if(cognitoUser != null){
			cognitoUser.getSession(function(err, session) {
	            if (err) {
	               console.log(err);
	                return;
	            }
	            console.log('session validity: ' + session.isValid());
	            if(!session.isValid()){
	            	$location.path('/signin');
	            }
	
	            token = session.getIdToken().getJwtToken();
	
		    });
		}
		else{
			$location.path('/signin');
		}
		var body = JSON.stringify(item);
		var params = {
		}
		var additionalParams = {
			headers : {
				Authorization : token
			}
		}
		
		return apigClient.itemsPost(params, body, additionalParams);
	}
	
	restServices.getUser = function(username){
		var params = {
			userId : username
		}
		return apigClient.usersUserIdGet(params, {}, {});
	}
	
	restServices.getUserItems = function(username){
		var params = {
			userId : username
		}
		return apigClient.usersUserIdItemsGet(params, {}, {});
	}
	
	restServices.getBorrowRequests = function(){
		cognitoUser = userPool.getCurrentUser();
		var token;
		if(cognitoUser != null){
			cognitoUser.getSession(function(err, session) {
	            if (err) {
	               console.log(err);
	                return;
	            }
	            console.log('session validity: ' + session.isValid());
	            if(!session.isValid()){
	            	$location.path('/signin');
	            }
	
	            token = session.getIdToken().getJwtToken();
	
		    });
		}
		else{
			$location.path('/signin');
		}
		var additionalParams = {
			headers : {
				'Authorization' : token
			}
		}
		
		return apigClient.requestsBorrowGet({}, {}, additionalParams);
	}
	
	restServices.getLendRequests = function(){
		cognitoUser = userPool.getCurrentUser();
		var token;
		if(cognitoUser != null){
			cognitoUser.getSession(function(err, session) {
	            if (err) {
	               console.log(err);
	                return;
	            }
	            console.log('session validity: ' + session.isValid());
	            if(!session.isValid()){
	            	$location.path('/signin');
	            }
	
	            token = session.getIdToken().getJwtToken();
	
		    });
		}
		else{
			$location.path('/signin');
		}
		var additionalParams = {
			headers : {
				'Authorization' : token
			}
		}
		
		return apigClient.requestsLendGet({}, {}, additionalParams);
	}
	
	restServices.getCurrentlyBorrowing = function(){
		cognitoUser = userPool.getCurrentUser();
		var token;
		if(cognitoUser != null){
			cognitoUser.getSession(function(err, session) {
	            if (err) {
	               console.log(err);
	                return;
	            }
	            console.log('session validity: ' + session.isValid());
	            if(!session.isValid()){
	            	$location.path('/signin');
	            }
	
	            token = session.getIdToken().getJwtToken();
	
		    });
		}
		else{
			$location.path('/signin');
		}
		var additionalParams = {
			headers : {
				'Authorization' : token
			}
		}
		
		return apigClient.itemsBorrowingGet({}, {}, additionalParams);
	}
	
	restServices.getCurrentlyLending = function(){
		cognitoUser = userPool.getCurrentUser();
		var token;
		if(cognitoUser != null){
			cognitoUser.getSession(function(err, session) {
	            if (err) {
	               console.log(err);
	                return;
	            }
	            console.log('session validity: ' + session.isValid());
	            if(!session.isValid()){
	            	$location.path('/signin');
	            }
	
	            token = session.getIdToken().getJwtToken();
	
		    });
		}
		else{
			$location.path('/signin');
		}
		var additionalParams = {
			headers : {
				'Authorization' : token
			}
		}
		
		return apigClient.itemsLendingGet({}, {}, additionalParams);
	}
	
	restServices.approveRequest = function(requestId){
		cognitoUser = userPool.getCurrentUser();
		var token;
		if(cognitoUser != null){
			cognitoUser.getSession(function(err, session) {
	            if (err) {
	               console.log(err);
	                return;
	            }
	            console.log('session validity: ' + session.isValid());
	            if(!session.isValid()){
	            	$location.path('/signin');
	            }
	
	            token = session.getIdToken().getJwtToken();
	
		    });
		}
		else{
			$location.path('/signin');
		}
		var additionalParams = {
			headers : {
				'Authorization' : token
			}
		}
		
		var params = {
				'requestId' : requestId
			}
		
		return apigClient.requestsRequestIdApprovePost(params, {}, additionalParams);
	}
	
	restServices.markReceived = function(requestId){
		cognitoUser = userPool.getCurrentUser();
		var token;
		if(cognitoUser != null){
			cognitoUser.getSession(function(err, session) {
	            if (err) {
	               console.log(err);
	                return;
	            }
	            console.log('session validity: ' + session.isValid());
	            if(!session.isValid()){
	            	$location.path('/signin');
	            }
	
	            token = session.getIdToken().getJwtToken();
	
		    });
		}
		else{
			$location.path('/signin');
		}
		var additionalParams = {
			headers : {
				'Authorization' : token
			}
		}
		var params = {
			'requestId' : requestId
		}
		
		return apigClient.requestsRequestIdMarkLentPost(params, {}, additionalParams);
	}
	
	restServices.markReturned = function(requestId){
		cognitoUser = userPool.getCurrentUser();
		var token;
		if(cognitoUser != null){
			cognitoUser.getSession(function(err, session) {
	            if (err) {
	               console.log(err);
	                return;
	            }
	            console.log('session validity: ' + session.isValid());
	            if(!session.isValid()){
	            	$location.path('/signin');
	            }
	
	            token = session.getIdToken().getJwtToken();
	
		    });
		}
		else{
			$location.path('/signin');
		}
		var additionalParams = {
			headers : {
				'Authorization' : token
			}
		}
		var params = {
			'requestId' : requestId
		}
		
		return apigClient.requestsRequestIdMarkReturnedPost(params, {}, additionalParams);
	}
	
	restServices.newRequest = function(itemId){
		cognitoUser = userPool.getCurrentUser();
		var token;
		if(cognitoUser != null){
			cognitoUser.getSession(function(err, session) {
	            if (err) {
	               console.log(err);
	                return;
	            }
	            console.log('session validity: ' + session.isValid());
	            if(!session.isValid()){
	            	$location.path('/signin');
	            }
	
	            token = session.getIdToken().getJwtToken();
	
		    });
		}
		else{
			$location.path('/signin');
		}
		var additionalParams = {
			headers : {
				'Authorization' : token
			}
		}
		
		var body = {ItemId : itemId};
		body = JSON.stringify(body);
		
		return apigClient.requestsPost({}, body, additionalParams);
	}
	
	restServices.getReviews = function(reviewType){
		cognitoUser = userPool.getCurrentUser();
		var token;
		if(cognitoUser != null){
			cognitoUser.getSession(function(err, session) {
	            if (err) {
	               console.log(err);
	                return;
	            }
	            console.log('session validity: ' + session.isValid());
	            if(!session.isValid()){
	            	$location.path('/signin');
	            }
	
	            token = session.getIdToken().getJwtToken();
	
		    });
		}
		else{
			$location.path('/signin');
		}
		var additionalParams = {
			headers : {
				'Authorization' : token
			}
		}
		var params = {
			'type' : reviewType
		}
		
		return apigClient.reviewsGet(params, {}, additionalParams);
	}
	
	restServices.updateReview = function(review){
		cognitoUser = userPool.getCurrentUser();
		var token;
		if(cognitoUser != null){
			cognitoUser.getSession(function(err, session) {
	            if (err) {
	               console.log(err);
	                return;
	            }
	            console.log('session validity: ' + session.isValid());
	            if(!session.isValid()){
	            	$location.path('/signin');
	            }
	
	            token = session.getIdToken().getJwtToken();
	
		    });
		}
		else{
			$location.path('/signin');
		}
		var additionalParams = {
			headers : {
				'Authorization' : token
			}
		}
		
		var body = JSON.stringify(review);
		
		return apigClient.reviewsPost({}, body, additionalParams);
	}
	
	return restServices;
}]);