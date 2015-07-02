angular.module("app").directive("proximitymap", function() {
	return {
		restrict: "E",
		templateUrl: 'directives/ProximityMap.html',
		scope: {
			title: "@"
		},
		controller: function($scope, $http){
		
	
	  $scope.getBranches = function(){
      
    $http.get('/branches').
      then(function(res) {
          $scope.branches = res.data;
      })["catch"](function(err){
        alert("Error making request", err);
        console.log(err);
      });
  };
  
  $scope.getBranches();				
		}
	};
});