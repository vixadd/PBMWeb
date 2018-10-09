angular.module('BorrowIt')
    .config(['$routeProvider', function($routeProvider) {
	       $routeProvider.when('/search', {
		   templateUrl: './search/search.html',
		   css: './search/search.css',
		   controller: 'SearchController',
		   controllerAs: 'vm'
	       }
	)}
    ])

    .controller('SearchController', ['$routeParams', '$location', '$scope', 'RestServices', function($routeParams, $location, $scope, rest) {
		var vm = this;
		
		vm.searchString = "";
		
		if($routeParams.q){
			console.log($routeParams);
			vm.searchString = $routeParams.q;
		}
		
		vm.items = [];
		
		vm.getItems = function(){
			rest.getItems()
			.then(function(response){
				$scope.$apply(function(){
					console.log(response);
					vm.items = response.data;
				});
			}).catch(function(result){
				console.log(result);
			});
		}
		
		vm.goToItemPage = function(itemId){
			$location.path('/item/'+itemId);
		}
		
		vm.getItems();
		
		
    }]).filter('searchFor', function(){

	    // All filters must return a function. The first parameter
	    // is the data that is to be filtered, and the second is an
	    // argument that may be passed with a colon (searchFor:searchString)
	
	    return function(arr, searchString){
	
		if(!searchString){
		    return arr;
		}
	
		var result = [];
	
		searchString = searchString.toLowerCase();
	
		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item){
	
		    if(item.title.toLowerCase().indexOf(searchString) !== -1){
			result.push(item);
		    }
	
		});
	
		return result;
	    };
});
