angular.module('app').controller('listCtrl',listCtrl);

function listCtrl($scope, $http) {
    
    $http.get('/productList').
        success(function(data, status, headers, config) {
          $scope.products = data;
        }).
        error(function(data, status, headers, config) {
          // log error
        });
    
}