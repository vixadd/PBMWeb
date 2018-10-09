angular.module('BorrowIt')
    .config(['$routeProvider', function($routeProvider) {
	       $routeProvider
	       .when('/item/new/add', {
			   templateUrl: './item/new-item/new-item.html',
			   css: './item/new-item/new-item.css',
			   controller: 'NewItemController',
			   controllerAs: 'vm'
		       }
	       )}
    ])

    .controller('NewItemController', ['$location', '$scope', 'RestServices', function($location, $scope, rest) {
    	var vm = this;
    	
    	vm.submitDisabled = false;
    	
    	vm.newItem = {
    			title : "",
				image: "http://placehold.it/400",
				description: "",
				condition: 5
    	}
    	
    	vm.submitItem = function(){
    		if(vm.submitDisabled){
    			return;
    		}
    		vm.submitDisabled = true;
    		rest.newItem(vm.newItem)
    		.then(function(response){
    			$scope.$apply(function(){
    				console.log(response.data);
	    			$location.path('/item/'+response.data.ItemId);
    			})
    		}).catch(function(result){
    			console.log(result);
    			vm.submitDisabled = false;
    		});
    	}
	
	
    }]);
