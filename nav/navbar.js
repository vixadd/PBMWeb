angular.module('BorrowIt')
.component('navbar', {
	templateUrl: './nav/navbar.html',
	controller: 'NavController',
	controllerAs: 'vm',
	bindings: {
		signedIn: '<',
		username: '<',
		newRequests: '<',
		newReviews: '<'
	}
})
.controller('NavController', [ '$location', function($location){
	var vm = this;
	
	vm.signInPage = function(){
		var currpath = $location.url();
		$location.url('/signin?backUrl='+currpath);
	}
}]);