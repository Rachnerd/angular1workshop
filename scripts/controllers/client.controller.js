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
        templateUrl: './views/client.template.html',
        /*
            1.5
            Each resolve key will execute before a route success and waits for its promise to succeed.
         */
        resolve: {
            /*
             *  1.7
             */
            client: function (ClientLoader, $route, $location) {
                return ClientLoader.load($route.current.params.id).catch(function (response) {
                    console.log('It failed');
                    $location.path('/');
                });
            }
        }
    })
})
.controller('ClientCtrl', function ($scope, ClientLoader) {
    //console.log(ClientLoader.client);
    /*
     *  1.9 - 2
     */
    //ClientLoader.client.firstName = 'Something else';
    //ClientLoader.client.save().then(function (response) {
    //    console.log(response.data.firstName);
    //});
})
/*
 *  1.6
 */
.service('ClientLoader', function (ClientService, Client) {
    this.client = null;
    this.load = function (id) {
        var service = this;
        return ClientService.getById(id).then(function (response) {
            //service.client = response.data;
            /*
             *  1.9 - 1
             */
            service.client = new Client(response.data);
        });
    }
})
/*
 *  1.8
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