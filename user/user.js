angular.module('BorrowIt')
    .config(['$routeProvider', function($routeProvider) {
	$routeProvider
	    .when('/user/:id', {
		templateUrl: './user/user.html',
		controller: 'UserController',
		controllerAs: 'vm'
	    })
    }])

    .controller('UserController', [ '$routeParams', '$scope', 'RestServices', function($routeParams, $scope, rest) {
    	var vm = this;
    	vm.username = $routeParams.id;
    	
    	vm.userExists = false;
    	vm.whoopsTime = false;
    	
    	vm.user = {};
    	vm.items = [];
    	vm.maxStars = 5;
    	
    	vm.getUser = function(){
    		rest.getUser(vm.username)
    		.then(function(response){
    			$scope.$apply(function(){
    				vm.user = response.data;
    				vm.userExists = true;
    				vm.user.lenderRep = vm.calcRep(vm.user.lendRep, vm.user.totalLendRatings);
    				vm.user.borrowerRep = vm.calcRep(vm.user.borrowRep, vm.user.totalBorrowRatings);
    				console.log(vm.user);
    			});
    		}).catch(function(result){
    			console.log(result);
    			vm.whoopsTime = true;
    		});
    	}
    	
    	vm.getItems = function(){
    		rest.getUserItems(vm.username)
    		.then(function(response){
    			$scope.$apply(function(){
    				vm.items = response.data;
    			});
    		}).catch(function(result){
    			console.log(result);
    		})
    	}
    	
    	vm.range = function(number){
			return new Array(number);
		}
    	
    	vm.calcRep = function(totalRep, totalRatings){
    		if(totalRatings === 0){
    			return 0;
    		}
    		
    		return totalRep / totalRatings;
    	}
    	
    	vm.getUser();
    	vm.getItems();
    }]);
