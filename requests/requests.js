angular.module('BorrowIt')
    .config(['$routeProvider', function($routeProvider) {
	       $routeProvider.when('/requests', {
		   templateUrl: './requests/requests.html',
		   css: './requests/requests.css',
		   controller: 'RequestsController',
		   controllerAs: 'vm'
	       }
	)}
    ])

    .controller('RequestsController', ['$routeParams', '$location', '$scope', 'RestServices', function($routeParams, $location, $scope, rest) {
    	var vm = this;
    	
    	vm.borrowRequests;
    	vm.lendRequests;
    	vm.currentlyBorrowedItems;
    	vm.currentlyLentItems;
    	
    	vm.alertMessage = "";
    	vm.showAlert = false;
    	vm.error = true;
    	
    	vm.getRequests = function() {
    		
    		rest.getBorrowRequests()
    		.then(function(response){
    			$scope.$apply(function(){
    				console.log(response.data);
    				vm.borrowRequests = response.data;
    			});
    		}).catch(function(result){
    			console.log(result);
    		});
    		
    		rest.getLendRequests()
    		.then(function(response){
    			$scope.$apply(function(){
    				console.log(response.data);
    				vm.lendRequests = response.data;
    			});
    		}).catch(function(result){
    			console.log(result);
    		});
    		
    		rest.getCurrentlyBorrowing()
    		.then(function(response){
    			$scope.$apply(function(){
    				console.log(response.data);
    				vm.currentlyBorrowedItems = response.data;
    			});
    		}).catch(function(result){
    			console.log(result);
    		});
    		
    		rest.getCurrentlyLending()
    		.then(function(response){
    			$scope.$apply(function(){
    				console.log(response.data);
    				vm.currentlyLentItems = response.data;
    			});
    		}).catch(function(result){
    			console.log(result);
    		});
    	}
    	
    	// Link to a user page.
    	vm.goToUserPage = function(username, event){
    		event.stopPropagation();
    		$location.path('/user/' + username);
    	}
    	
    	// Link to an item page
    	vm.goToItemPage = function(itemId){
    		$location.path('/item/' + itemId);
    	}
    	
    	// Mark that you have received an item to borrow
    	vm.markReceived = function(request, event){
    		event.stopPropagation();
    		
    		rest.markReceived(request.RequestId)
    		.then(function(response){
    			$scope.$apply(function(){
    				vm.getRequests();
        			vm.showAlert = false;
    			});
    		}).catch(function(result){
    			$scope.$apply(function(){
    				console.log(result);
        			vm.alertMessage = "Unable to mark the item as received. Try again later.";
        			vm.showAlert = true;
        			vm.error = true;
    			});
    		});
    	}
    	
    	// Mark that the borrower has returned the item to you.
    	vm.markReturned = function(request, event){
    		event.stopPropagation();
    		
    		rest.markReturned(request.RequestId)
    		.then(function(response){
    			$scope.$apply(function(){
    				vm.getRequests();
    				vm.error = false;
    				vm.alertMessage = request.itemTitle + " has been returned!";
        			vm.showAlert = true;
    			});
    		}).catch(function(result){
    			$scope.$apply(function(){
    				console.log(result);
        			vm.alertMessage = "Unable to mark the item as returned. Try again later.";
        			vm.showAlert = true;
        			vm.error = true;
    			});
    		});
    		
    	}
    	
    	// Approve a request to borrow your item.
    	vm.approve = function(request, event){
    		event.stopPropagation();
    		
    		rest.approveRequest(request.RequestId)
    		.then(function(response){
    			$scope.$apply(function(){
    				vm.getRequests();
        			vm.showAlert = false;
    			});
    		}).catch(function(result){
    			$scope.$apply(function(){
    				console.log(result);
        			vm.alertMessage = "Unable to approve request. Try again later.";
        			vm.showAlert = true;
        			vm.error = true;
    			});
    		});
    	}
    	
    	vm.getDeltaTime = function(startTime){
    		return Date.now() - (startTime);
    	}
    	
    	vm.getRequests();
}])
.filter('millSecondsToTimeString', function() {
  return function(millseconds) {
    var oneSecond = 1000;
    var oneMinute = oneSecond * 60;
    var oneHour = oneMinute * 60;
    var oneDay = oneHour * 24;

    var seconds = Math.floor((millseconds % oneMinute) / oneSecond);
    var minutes = Math.floor((millseconds % oneHour) / oneMinute);
    var hours = Math.floor((millseconds % oneDay) / oneHour);
    var days = Math.floor(millseconds / oneDay);

    var timeString = '';
    if (days !== 0) {
        timeString += (days !== 1) ? (days + ' d ') : (days + ' d ');
    }
    if (hours !== 0) {
        timeString += (hours !== 1) ? (hours + ' h ') : (hours + ' h ');
    }
    if (minutes !== 0) {
        timeString += (minutes !== 1) ? (minutes + ' m ') : (minutes + ' m ');
    }
    /*if (seconds !== 0 || millseconds < 1000) {
        timeString += (seconds !== 1) ? (seconds + ' seconds ') : (seconds + ' second ');
    }*/

    return timeString;
};
});
