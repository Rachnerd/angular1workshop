/**
 * Created by rheimbach on 1/27/2016.
 */
/**
    myApp module. Module dependencies can only be declared once per module. Other uses of the existing module can not have a second param!
    fakeBackend -   Written Angular 1 module that mocks a backend and handles HTTP requests.
                    Backend data and possible requests for this workshop are found in libs/fake-backend.js.
    ngRoute     -   Angular's basic routing module.
    ngResource  -   Angular's more advanced API for handling HTTP requests. (layer on top of the standard included $http)
    vClient     -   Custom module that will package all parts related to Client functionality (scripts/services/client.service.js).
 */
angular.module('myApp', ['fakeBackend', 'ngRoute', 'ngResource', 'vClient'])
/**
     Allow logs on debug level to be shown in the browser's development tools console (f12 chrome).
     true    ->  libs/fakeBackend.js (in .config) logs all request handling on debug level.
 */
.config(function($logProvider) {
    $logProvider.debugEnabled(false);
})
/**
 *  $routeProvider  -   Provider for routing that configures all possible routes.
 *                      This configuration states that every request that is not specified should redirect to '/'.
 *                      See scripts/controllers/home.controller.js for the first route.
 */
.config(function ($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/'
    });
});