angular.module('BorrowIt')
.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/colleges', {
	    templateUrl: './colleges-served/colleges-served.html',
	});
}]);