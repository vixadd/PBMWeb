/*
 * Angular root application for the Capstone Project
 * Will be the root for BorrowIt.
 *
 *      Author: David Kroell
 *     Version: 0.0.1
 */

// Instantiate the module to use.
angular.module("BorrowIt", ['ngRoute'])

    // Configure the application with the routing system.
    .config(['$routeProvider', '$locationProvider',
	     function($routeProvider, $locationProvider) {

	$routeProvider
	// Signup page
	    .when('./signup', {
		templateUrl: './signup/signup.html',
		controller: 'SignUp',
		css: './signup/signup.css'
	    })
	// For user management, as well as views.
	    .when('/user/:id', {
		templateUrl: './user/user.html',
		css:    './user/user.css',
		controller:  'UserController'
	    })
	    .otherwise({ redirectTo: '/'});

    }])


    .controller("AppController", function($scope) {
    	var vm = this;
    	
    	$scope.loggedIn = false;
    	vm.signedIn = false;
    	vm.username = "";
    	$scope.loggedInUsername = "";
    	vm.newRequests = 0;
    	vm.newReviews = 0;
    	
    	var poolData = { 
    			UserPoolId : 'us-east-1_2tWi4ARGA', // Your user pool id here
    		    ClientId : '1a9tue69nuhci0j7e4t0i83foc' // Your client id here
    	};
    		
    	vm.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    	vm.cognitoUser;
    	
    	vm.getNewRequests = function(){
    		vm.newRequests = 5;
    	}
    	
    	vm.getNewReviews = function(){
    		vm.newReviews = 6;
    	}
    	
    	$scope.updateLoggedIn = function(){
    		vm.cognitoUser = vm.userPool.getCurrentUser();
    		if(vm.cognitoUser){
    			vm.signedIn = true;
    			$scope.loggedIn = true;
    			vm.username = vm.cognitoUser.username;
    			$scope.loggedInUsername = vm.username;
    			vm.getNewRequests();
    			vm.getNewReviews();
    		}
    		else{
    			$scope.loggedIn = false;
    			vm.signedIn = false;
    		}
    	}
    	
    	$scope.isLoggedIn = function(){
    		if($scope.loggedIn){
    			return true;
    		}
    		
    		return false;
    	}
    	
    	
    	$scope.updateLoggedIn();
    });
