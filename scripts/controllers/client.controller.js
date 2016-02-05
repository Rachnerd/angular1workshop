angular.module('myApp')
.config(function ($routeProvider) {
    $routeProvider.when('/client/:id', {
        controller: 'ClientCtrl',
        templateUrl: './views/client.template.html'
    })
})
.controller('ClientCtrl', function ($scope, ClientService, $routeParams) {
    ClientService.getById($routeParams.id)
        .then(function (response) {
            $scope.client = response.data;
        }, function (response) {

        });
});