angular.module('app').controller('ListCtrl',ListCtrl);

function ListCtrl($scope, $http, $timeout, $q, $log) {

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
  
  $scope.addProduct = function (productName) {
    
    var p = $scope.products.filter(function(prod){
      return productName === prod.name;
    })[0];

    if(p == null){
      p = {
        name: productName,
        quantity: 1
      };
      $scope.products.push(p);
    } else {
      p.quantity++;
    }

    console.log(p);
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
  
  $scope.showResults = function()
  {
    $scope.getBranches();   
  };










//  Material design auto-complete
////////////////////////////////////////////////////////////

    var self = this;
    $scope.simulateQuery = false;
    $scope.isDisabled    = false;
    // list of `state` value/display objects
    $scope.states        = loadAll();
    $scope.querySearch   = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange   = searchTextChange;
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      
      console.log(query);
      
      var results = query ? $scope.states.filter( createFilterFor(query) ) : self.states,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }
    /**
     * Build `states` list of key/value pairs
     */
    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
  

}

