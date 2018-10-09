/*
 * Angular Module controller for the home page
 * on the application.
 */
angular.module('BorrowIt')
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: './home/home.html',
		css: './home/home.css',
		controller: 'HomeController',
		controllerAs: 'vm'
	 })
}])
.controller('HomeController', ['$location', function($location) {
	var vm = this;
	
	vm.searchString = "";
	
	vm.search = function(searchString){
		if(searchString && searchString != ""){
			$location.url("/search?q=" + searchString);
		}
	}
}]);
