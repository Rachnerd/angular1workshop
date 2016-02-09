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
.controller('HomeCtrl', function ($scope, ClientService) {
    /**
     *  Syntax: promise
     *              .then(successCb, errorCb, notifyCb);
     *         or
     *          promise
     *              .then(successCb)
     *              .catch(errorCb)
     */
    ClientService.get()
        .then(function (response) {
            console.log('HomeCtrl response data', response.data); // f12 developer tools console.
        })
        .catch(function () {
            console.log('Something went wrong');
        });

    $scope.welcomeText = 'Open developer tools -> console';
});
