/**
 * Created by rheimbach on 1/27/2016.
 */
/**
 *  Angular module myApp without second param (dependencies array) because it already exists.
 *  Home page config.
 */
angular.module('myApp')
.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'HomeCtrl',
        templateUrl: './views/home.template.html'
    })
})
.controller('HomeCtrl', function ($scope) {
    $scope.welcomeText = 'Welkom bij de Angular 1 workshop.'
});
