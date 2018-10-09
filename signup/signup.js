angular.module('BorrowIt')
    .config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/signup', {
	    templateUrl: './signup/signup.html',
	    controller: 'SignupController',
	    controllerAs: 'vm'
	})
	.when('/signup-success', {
		templateUrl:'./signup/signup-success.html'
	})

    }]).controller('SignupController', ['$scope', '$location', function($scope, $location) {
		var vm = this;
		
		vm.poolData = {
	        UserPoolId : 'us-east-1_2tWi4ARGA', // Your user pool id here
	        ClientId : '1a9tue69nuhci0j7e4t0i83foc' // Your client id here
	    };
		
	    vm.userPool = new AmazonCognitoIdentity.CognitoUserPool(vm.poolData);
		
		vm.cognitoUser = vm.userPool.getCurrentUser();
		
		if(vm.cognitoUser != null){
			$location.url('/');
		}
		
		vm.submitEnabled = true;
		
		vm.showSignUpError = false;
		vm.errorText = "";
		
		vm.userName;
		vm.email;
		vm.password;
		vm.confirmPassword;
		
		vm.showUserNameError = false;
		
		vm.emailStatusIcon;
		vm.showEmailStatusIcon = false;
		vm.emailError;
		vm.showEmailError = false;
		
		vm.passwordStatusIcon;
		vm.showPasswordStatusIcon = false;
		vm.showPasswordError = false;
		
		vm.signUp = function() {
	
		    var attributeList = [];
	
		    var dataEmail = {
		        Name : 'email',
		        Value : vm.email
		    }
		    
		    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
	
		    attributeList.push(attributeEmail);
	
		    vm.userPool.signUp(vm.userName, vm.password, attributeList, null, vm.signUpCallback);
		}
		
		vm.signUpCallback = function(err, result){
			$scope.$apply(function() {
				if (err) {
					console.log("Registration error!");
					if(err.message.toLowerCase().indexOf('password') > -1){
						vm.errorText = 'Password must be at least 8 characters in length, contain a symbol, contain an uppercase letter, and contain a digit.'
					}
					else if(err.message.toLowerCase().indexOf('user') > -1){
						vm.showUserNameError = true;
						vm.errorText = 'Chosen username is unavailable.';
					}
					else if(err.message.toLowerCase().indexOf('email') > -1){
						vm.errorText = 'Invalid email. Note that only school emails are allowed.';
					}
					else{
						vm.errorText = 'An error occurred with registration. Check all fields and try again.';
					}
					console.log(err.message);
		            vm.showSignUpError = true;
		            vm.submitEnabled = true;
		            return;
		        }
		        vm.showSignUpError = false;
		        vm.cognitoUser = result.user;
		        console.log("Successfully registered!")
		        console.log('User name is: ' + vm.cognitoUser.getUsername());
		        $location.url('/signup-success');
			});
		}
		
		vm.validate = function(){
			if(vm.checkPasswordMatching() != 'has-success'){
				return false;
			}
			if(vm.checkEmailRequirements() != 'has-success'){
				return false;
			}
			if(!vm.userName || vm.userName == ''){
				return false;
			}
			return true;
		}
		
		vm.submit = function(){
			if(vm.submitEnabled){
				vm.submitEnabled = false;
				if(vm.validate()){
					vm.signUp();
					return;
				}
				vm.submitEnabled = true;
			}
		}
		
		vm.checkPasswordMatching = function(){
			if(vm.password && vm.confirmPassword){
				vm.showPasswordStatusIcon = true;
				if(vm.confirmPassword == vm.password){
					vm.passwordStatusIcon = 'glyphicon-ok';
					vm.showPasswordError = false;
					return 'has-success';
				}
				vm.passwordStatusIcon = 'glyphicon-warning-sign';
				vm.showPasswordError = true;
				return 'has-error';
			}
			vm.showPasswordStatusIcon = false;
			return '';
		}
		
		vm.checkEmailRequirements = function(){
			if(vm.email){
				vm.showEmailStatusIcon = true;
				if(vm.email.indexOf('@') > 0){
					if(vm.email.indexOf('.edu') > 0){
						vm.emailStatusIcon = 'glyphicon-ok';
						vm.showEmailError = false;
						return 'has-success';
					}
					
					vm.emailError = "We require a student email address to register.";
				}
				else{
					vm.emailError = "Invalid email address.";
				}
				vm.showEmailError = true;
				vm.emailStatusIcon = 'glyphicon-warning-sign';
				return 'has-error';
			}
			vm.showEmailStatusIcon = false;
			return '';
		}
		
		
		
    }]);
