
/*

TODO:

- Rename CSS Classes (maybe)

*/

// Create angular module
var app = angular.module('TodoList', ['ngRoute']);

// Routing-Configuration
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/list/0'
        })
        .when('/list/:id', {
            templateUrl: 'pages/todolist.html',
            controller: 'TodoListController'
        })
        .when('/settings', {
            templateUrl: 'pages/settings.html',
            controller: 'SettingsController'
        })
        .otherwise({
            redirectTo: '/list/0'
        });
}]);

