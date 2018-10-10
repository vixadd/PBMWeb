/*
 * Angular root application for the Philedelphia Baptist Ministry Website.
 *
 *      Author: David Kroell
 *     Version: 0.1.2
 */

// Instantiate the module to use.
angular.module("PBMWeb", ['ngRoute'])

    // Configure the application with the routing system.
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	 $routeProvider.otherwise({ redirect: "/" });
});
