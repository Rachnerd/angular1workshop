/**
 * Created by rheimbach on 1/27/2016.
 */
/**
    myApp module.
    fakeBackend -   Written Angular 1 module that mocks a backend and handles HTTP requests.
                    Backend data and possible requests for this workshop are found in lib/fake-backend.js.
    ngRoute     -   Angular's basic routing module.
    ngResource  -   Angular's more advanced API for handling HTTP requests. (layer on top of the standard included $http)
 */
angular.module('myApp', ['fakeBackend', 'ngRoute', 'ngResource'])
.config(function($routeProvider, $logProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });
    /**
        Allow logs on debug level to be shown in the browser's development tools console (f12 chrome).
        true    ->  fakeBackend logs all request handling on debug level.
     */
    $logProvider.debugEnabled(false);
});