angular.module('app',['ngRoute'])
    .config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/list', {
                templateUrl: 'public/views/shoppingList.html',
                controller: 'listCtrl as list'
            }).
            when('/more', {
                templateUrl: 'public/views/more.html'
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

