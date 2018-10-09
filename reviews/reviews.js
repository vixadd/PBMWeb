angular.module('BorrowIt')
    .config(['$routeProvider', function($routeProvider) {
	       $routeProvider.when('/reviews', {
		   templateUrl: './reviews/reviews.html',
		   css: './reviews/reviews.css',
		   controller: 'ReviewsController',
		   controllerAs: 'vm'
	       }
	)}
    ])

    .controller('ReviewsController', ['$routeParams', '$location', '$scope', 'RestServices', function($routeParams, $location, $scope, rest) {
    	var vm = this;
    	
    	vm.borrowReviews;
    	vm.lendReviews;
    	
    	vm.review = {};
    	
    	vm.selectedReview;
    	
    	vm.submitDisabled = false;
    	vm.submitting = false;
    	
    	vm.alertMessage = "";
    	vm.showAlert = false;
    	vm.error = true;
    	
    	vm.getReviews = function() {
    		
    		rest.getReviews("BORROW")
    		.then(function(response){
    			$scope.$apply(function(){
    				console.log(response.data);
    				vm.borrowReviews = response.data;
    			});
    		}).catch(function(result){
    			console.log(result);
    		});
    		
    		rest.getReviews("LEND")
    		.then(function(response){
    			$scope.$apply(function(){
    				console.log(response.data);
    				vm.lendReviews = response.data;
    			});
    		}).catch(function(result){
    			console.log(result);
    		});
    	}
    	
    	// Update a review
    	vm.updateReview = function(){
    		if(!vm.submitDisabled){
	    		vm.submitDisabled = true;
	    		vm.submitting = true;
	    		rest.updateReview(vm.review)
	    		.then(function(response){
	    			$scope.$apply(function(){
		    			console.log(response.data);
		    			vm.getReviews();
		    			vm.alertMessage = "Successfully completed review.";
		    			vm.showAlert = true;
		    			vm.error = false;
		    			vm.submitDisabled = false;
		    			vm.submitting = false;
		    			delete vm.selectedReview;
	    			});
	    		}).catch(function(result){
	    			$scope.$apply(function(){
	    				console.log(result);
	    				vm.alertMessage = "Error trying to submit review. Try again later.";
		    			vm.showAlert = true;
		    			vm.error = true;
	    				vm.submitDisabled = false;
	    				vm.submitting = false;
	    			});
	    		});
    		}
    	}
    	
    	vm.reviewSelected = function(review){
    		vm.selectedReview = review;
    		
    		vm.review = {
    			ReviewId: review.ReviewId,
    			rating: 0,
    			comment: ""
    		};
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
    	
    	vm.getDeltaTime = function(startTime){
    		return Date.now() - (startTime);
    	}
    	
    	vm.getReviews();
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