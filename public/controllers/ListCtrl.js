angular.module('app').controller('ListCtrl',ListCtrl);

function ListCtrl($scope, $http) {

  $scope.newName = "";
  $scope.products = []; // TODO(benjamingr) load from localStorage

  var lastSearch = null;
  $scope.getProducts = function getProducts(name){
  
    if (name === '') {
      $scope.search = [];
      return;
    }
    
    var p = $http.get('/products/' + name).
      then(function(res) {
        if(p === lastSearch){
          $scope.search = res.data;
        }
      })["catch"](function(err){
        alert("Error making request", err);
        console.log(err);
      });
    lastSearch = p;
  };
  
  $scope.addProduct = function (product) {
    var p = $scope.products.filter(function(prod){
      return product.name === prod.name;
    })[0];

    if(p == null){
      p = {
        name: product.name,
        price: product.price,
        _id: product._id,
        quantity: 1
      };
      $scope.products.push(p);
    } else {
      p.quantity++;
    }
  };

  $scope.incQuantity = function(product){
    product.quantity++;
  };

  $scope.decQuantity = function(product){
    product.quantity--;
    if(product.quantity === 0){
      $scope.products = $scope.products.filter(function(p){
        return p !== product; 
      });
    }
  };
  
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