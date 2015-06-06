angular.module("app").directive("proximitymap", function() {
	return {
		restrict: "E",
		template: '<map zoom="11"' + 
			' center="[40.74, -74.18]"' +
			' dragging-cursor="move"' +
			' tilt="45"' +
			' map-type-id="TERRAIN"></map>',
		scope: {
			title: "@"
		},
		controller: function($scope){
			$scope.zoom = 11;
		}
	};
});