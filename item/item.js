var app = angular.module('BorrowIt');

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/item/:id', {
			templateUrl: '/item/item.html',
			css: '/item/item.css',
			controller: 'ItemController',
			controllerAs: 'vm'
		 })
}])

app.controller('ItemController', ['$routeParams', '$scope', 'RestServices', function($routeParams, $scope, rest) {
		var vm = this;
		
		vm.loggedIn = $scope.loggedIn;
		vm.loggedInUsername = $scope.loggedInUsername;
		
		vm.itemId = $routeParams.id;
		
		vm.item = {
			image : 'http://placehold.it/400'
		}
		
		vm.disableButton = false;
		vm.itemRequested = false;
		vm.requesting = false;
		
		vm.errorMessage = "";
		vm.showError = false;
		
		vm.maxStars = 5;
		
		vm.getItem = function(){
			rest.getItem(vm.itemId)
			.then(function(response){
				$scope.$apply(function(){
					vm.item = response.data;
				});
			}).catch(function(result){
				console.log(result);
			})
		}
		
		vm.range = function(number){
			return new Array(number);
		}
		
		vm.borrowItem = function(){
			vm.disableButton = true;
			vm.requesting = true;
			rest.newRequest(vm.item.ItemId)
			.then(function(response){
				$scope.$apply(function(){
					vm.itemRequested = true;
					vm.requesting = false;
				});
			}).catch(function(result){
				$scope.$apply(function(){
					vm.errorMessage = "Unable to request this item at this time. Please try again later.";
					vm.showError = true;
					vm.requesting = false;
				});
			});
		}
		
		vm.getItem();
		
		
	}]);