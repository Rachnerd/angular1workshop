/*
 *  Assignment 1.1
 */
angular.module('myApp')
.config(function ($routeProvider) {
    /*
     *  Assignment 1.2
     */
    $routeProvider.when('/client/:id', {
        controller: 'ClientCtrl',
        templateUrl: './views/client.template.html'
    })
})
.controller('ClientCtrl', function ($scope, ClientService, $routeParams) {
    /*
     *  Assignment 1.4
     */
    ClientService.getById($routeParams.id)
        .then(function (response) {
            console.log(response.data);
        }, function (response) {

        });
});