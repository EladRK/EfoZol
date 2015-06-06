angular.module("app").directive("proximitymap", function() {
	return {
		restrict: "E",
		templateUrl: 'directives/ProximityMap.html',
		scope: {
			title: "@"
		},
		controller: function($scope, $http){
			$scope.zoom = 11;
	
	// $scope.branches = [
	// 	{pos: [32.0771929, 34.7870064], name:"elad"},
	// 	{pos: [32.0898466, 34.7799683], name:"elad"},
	// 	{pos: [32.0738474, 34.7703552], name:"elad"}
	// ];
	
	
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