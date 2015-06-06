angular.module('app').controller('listCtrl',listCtrl);

function ListCtrl($scope, $http) {

  $scope.newName = "";
  $scope.productsFull = [];

  function getProducts(name)
  {
    if (name === '') {
      $scope.products = [];
      return;
    }
    
      $http.get('/products/' + name).
          success(function(data, status, headers, config) {
            $scope.products = data;
          }).
          error(function(data, status, headers, config) {
            // log error
          });
    
  }

  $scope.$watch("newName", function(newValue, oldValue) {
   
    getProducts(newValue);
  });
  
  
  $scope.addProduct = function (productName) {
    console.log(productName);
    $scope.productsFull.push(productName);
  }
  
}