angular.module('BorrowIt')
    .config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/signin', {
	    templateUrl: './signin/signin.html',
	    controller: 'SigninController',
	    controllerAs: 'vm'
	})
    }]).controller('SigninController', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
		var vm = this;
		
		vm.backUrl = $routeParams.backUrl;
		
		vm.username;
		vm.password;
		
		vm.submitEnabled = true;
		
		vm.showSignInError = false;
		vm.errorText = "";
	
		vm.submit = function() {
			if(vm.submitEnabled) {
				vm.submitEnabled = false;
				var authenticationData = {
			        Username : vm.username,
			        Password : vm.password,
			    };
			    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
			    var poolData = { 
			    	UserPoolId : 'us-east-1_2tWi4ARGA', // Your user pool id here
				    ClientId : '1a9tue69nuhci0j7e4t0i83foc' // Your client id here
			    };
			    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
			    var userData = {
			        Username : vm.username,
			        Pool : userPool
			    };
			    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
			    cognitoUser.authenticateUser(authenticationDetails, {
			    	
			        onSuccess: function (result) {
			        	$scope.$apply(function(){
			        		$scope.updateLoggedIn();
			        		console.log(result);
			        		if(vm.backUrl && !vm.backUrl.includes('signout')){
			        			$location.url(vm.backUrl);
			        		}
			        		else{
			        			$location.path('/');
			        		}
			        	});
			        	
			            
			        },
	
			        onFailure: function(err) {
			        	$scope.$apply(function() {
			        		vm.errorText = err.message;
				            vm.showSignInError = true;
				            vm.submitEnabled = true;
			        	});
			        },
	
			    });
			}
		}

    }]);
