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
     *              .then(successCb, errorCb, notifyCb);
     *         or
     *          promise
     *              .then(successCb)
     *              .catch(errorCb)
     */
    ClientService.get()
        .then(function (response) {
            console.log('HomeCtrl response data', response.data); // f12 developer tools console.
            $scope.clients = response.data;
        })
        .catch(function () {
            console.log('Something went wrong');
        });
    $scope.welcomeText = 'Open developer tools -> console';

    /*
     *  1.8
     */
    $scope.create = function () {
        ClientService.create($scope.newClient)
            .then(function (response) {
                $scope.clients.push(response.data);
                $scope.newClient = null;
            });
    };
    /*
     *  1.9
     */
    /**
     * Selected client helps the template to show only buttons for 1 client at the time.
     */
    $scope.selected = null;
    /**
     * Set the selected client, click handler for client name click.
     */
    $scope.select = function (client) {
        $scope.selected = client;
    };
    /**
     * Delete click handler.
     * @param client
     */
    $scope.delete = function (client) {
        ClientService.delete(client.id)
            .then(function (response) {
                console.log(response.data);
                var index = $scope.clients.indexOf(client);
                $scope.clients.splice(index, 1);
            });
    };
    /*
     *  1.10
     */
    $scope.show = function (client) {
        $location.path('client/' + client.id);
    };
}).directive('header', function () {
    return {
        restrict: 'E',
        scope: {}
    }
});
