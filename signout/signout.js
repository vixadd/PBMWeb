angular.module('BorrowIt')
    .config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/signout', {
	    templateUrl: './signout/signout.html',
	    controller: 'SignOutController',
	    controllerAs: 'vm'
	})
    }]).controller('SignOutController', ['$scope', '$location', function($scope, $location) {
		var vm = this;
		
		var poolData = { 
			UserPoolId : 'us-east-1_2tWi4ARGA', // Your user pool id here
		    ClientId : '1a9tue69nuhci0j7e4t0i83foc' // Your client id here
	    };
		
	    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	    var cognitoUser = userPool.getCurrentUser();

	    if (cognitoUser != null) {
	        cognitoUser.signOut();
	        $scope.updateLoggedIn();
	        console.log("Signed out!");
	    }
	    
	    cognitoUser = userPool.getCurrentUser();
	    
	    if(cognitoUser != null){
	    	console.log("Wait we didn't sign out...");
	    }

    }]);
