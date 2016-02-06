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
        templateUrl: './views/client.template.html',
        resolve: {
            client: function (ClientLoader, $route) {
                return ClientLoader.load($route.current.params.id);
            }
        }
    })
})
.controller('ClientCtrl', function ($scope, ClientLoader) {
    $scope.client = ClientLoader.client;
    $scope.client.firstName = "Pieter";
    //$scope.client.save();
    /*
     *  Assignment 1.4
     */
    //ClientService.getById($routeParams.id)
    //    .then(function (response) {
    //       // console.log(response.data);
    //    }, function (response) {
    //
    //    });
}).service('ClientLoader', function (ClientService, Client) {
    this.load = function (id) {
        this.client = null;
        var service = this;
        return ClientService.getById(id).then(function (response) {
            service.client = new Client(response.data);
        });
    }
}).factory('Client', function ($http) {
    function Client(client) {
        angular.extend(this, client);
    }
    Client.prototype.save = function () {
        return ClientService.put(this);
    };
    return Client;
});