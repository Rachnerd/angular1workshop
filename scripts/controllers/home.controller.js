/**
 * Created by rheimbach on 1/27/2016.
 */
/**
 *  Angular module myApp without second param (dependencies array) because it already exists in scripts/app.js.
 */
angular.module('myApp')
/**
 *  Tell the routing that the '/' url should assign home's controller and template.
 *  (Technically /#/. Hash just prevents the browser from sending requests)
 */
.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'HomeCtrl',
        templateUrl: './views/home.template.html'
    });
})
/**
 *  Home controller that controls the homepage template.
 *  $scope  -   JS object that serves as the ViewModel of the home page.
 *  ClientService   -   Custom service in vClient module (scripts/services/client.service.js).
 */
.controller('HomeCtrl', function ($scope, ClientService, $location) {
    /**
     *  Syntax: promise
     *              .then(successFn, errorFn);
     */
    ClientService.get()
        .then(function promiseSuccessHandler(response) {
            console.log(response.data); // f12 developer tools console.
            $scope.clients = response.data;
        }, function promiseErrorHandler(response) {
            console.log(response);
        });

    //ClientService.put(1, {firstName: 'Kees'})
    //    .then(function promiseSuccessHandler(response) {
    //        $scope.clients[0] = response.data;
    //    }, function promiseErrorHandler(response) {
    //        console.log(response);
    //    });

    //ClientService.delete(1)
    //    .then(function promiseSuccessHandler(response) {
    //        console.log(response.data.message);
    //    }, function promiseErrorHandler(response) {
    //        console.log(response);
    //    });

    $scope.welcomeText = 'Welkom bij de Angular 1 workshop.';

    $scope.redirectTo = function (url) {
        $location.path(url);
    };
});
