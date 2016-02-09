/*
 *  1.1
 */
angular.module('myApp')
.config(function ($routeProvider) {
    /*
     *  1.2
     */
    $routeProvider.when('/client/:id', {
        controller: 'ClientCtrl',
        templateUrl: './views/client.template.html'
    })
})
.controller('ClientCtrl', function ($scope, ClientService, $routeParams, $location) {
    ClientService.getById($routeParams.id).then(function (response) {
        console.log(response.data);
    }).catch(function () {
        $location.path('/');
    });
});