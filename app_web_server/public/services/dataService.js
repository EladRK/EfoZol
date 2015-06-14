angular.module('app')
    .service('dataService',dataService)

function dataService() {
    this.getProducts = function () {
        return [
            {"name":"milk"},{"price":"10"},
            {"name":"bread"},{"price":"10"},
            {"name":"cookies"},{"price":"10"}
        ]
    }
}