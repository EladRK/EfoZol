angular.module('app',['ngRoute', 'ngMap'])
    .config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/list', {
                templateUrl: 'views/shoppingList.html',
                controller: 'ListCtrl as list'
            }).
            when('/more', {
                templateUrl: 'views/more.html'
            }).
            otherwise({
                redirectTo: '/list'
            });
    }])
    .constant('appConfig', {
    servers: {
        "localhost": "http://localhost:3000/"
    }
});

