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
        /*
            Assignment 1.5
         */
        resolve: {
            /*
             *  1.7
             */
            client: function (ClientLoader, $route) {
                return ClientLoader.load($route.current.params.id);
            }
        }
    })
})
.controller('ClientCtrl', function ($scope, ClientLoader) {
    /*
     *  Assignment 1.4
     */
    //ClientService.getById($routeParams.id)
    //    .then(function (response) {
    //       // console.log(response.data);
    //    }, function (response) {
    //
    //    });
    console.log(ClientLoader.client);
    /*
     *  Assignment 1.9
     */
    ClientLoader.client.firstName = 'Something else';
    ClientLoader.client.save().then(function (response) {
        console.log(response);
    })
})
/*
 *  Assignment 1.6
 */
.service('ClientLoader', function (ClientService, Client) {
    this.client = null;
    this.load = function (id) {
        var service = this;
        return ClientService.getById(id).then(function (response) {
            //service.client = response.data;
            /*
             *  1.9
             */
            service.client = new Client(response.data);
        });
    }
})
/*
 *  Assignment 1.8
 */
.factory('Client', function (ClientService) {
    function Client(client) {
        angular.extend(this, client);
    }
    Client.prototype.save = function () {
        return ClientService.put(this);
    };
    return Client;
});