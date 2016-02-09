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
    /*
     *  1.4
     */
    ClientService.getById($routeParams.id)
        .then(function (response) {
            $scope.client = response.data;
        })
        /*
         *  1.5
         */
        .catch(function () {
            $location.path('/');
        });
});