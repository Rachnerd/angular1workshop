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
        /**
         *  1.7
         *  Add the "resolve" attribute to the /client/:id $route configuration.
         *  Set the resolve attribute as follows:
         *  {
         *      client: function () {}
         *  }
         *  Every resolve function expects a promise which determines if the route succeeds.
         *  Succeeded routes will load the assigned controller.
         */
        resolve: {
            /**
             *  1.8
             *  Implement the client resolve function by letting it return the previous created ClientLoader.load function.
             *  The parameter of the route can be retrieved by injecting $route ($route.current.params).
             *  Try to load the page with id 1 (does exist) and 3 (doesn't exist) to see if it works.
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
    /**
     *  1.9
     *  Now that the resolve function determines if the page can be loaded and has set the client if it does, ClientCtrl
     *  only needs to inject the ClientLoader and can get the loaded client.
     *  Console the loaded client in ClientCtrl.
     */
    console.log(ClientLoader.client);
    /**
     *  1.13
     *  Now in the ClientCtrl we get an instance of the Client factory in stead of a plain js object.
     *  Change the client's firstName and call the save function. The save function should return a promise,
     *  so add a success handler that consoles the response. The response should contain an updated client.
     */
    ClientLoader.client.firstName = 'Something else';
    ClientLoader.client.save().then(function (response) {
        console.log(response);
    })
})
/**
 *  1.6
 *  Create a service called ClientLoader that contains a load function and a client variable.
 *  The load function has a parameter id and returns ClientService's getById(id). This load service is only interested in
 *  the succeeding GET request so it only adds the success handler to ClientService.getById(id) client from the server.
 *  Failed requests will still return a failed promise.
 */
.service('ClientLoader', function (ClientService, Client) {
    this.client = null;
    this.load = function (id) {
        var service = this;
        return ClientService.getById(id).then(function (response) {
            //service.client = response.data;
            /**
             *  1.12
             *  Inject the Client factory in the ClientLoader.
             *  The success handler of the load function sets it's client with the response.
             *  Convert the response to an instance of Client (new Client(response.data))
             */
            service.client = new Client(response.data);
        });
    }
})
/**
 *  1.10
 *  This assignment will show a factory implementation that is not possible to recreate with a service (with this syntax).
 *  Create a factory named Client. Inside this Client create a local Client function that receives a client as param and extends the
 *  properties of the client. Let the Client factory return the local Client function.
 */
.factory('Client', function (ClientService) {
    function Client(client) {
        angular.extend(this, client);
    }
    /**
     *  1.11
     *  Create a save function on the prototype of the local Client function. Add the ClientService dependency to the Client factory
     *  and implement the save function by returning the ClientService's put function with itself as parameter.
     */
    Client.prototype.save = function () {
        return ClientService.put(this);
    };
    return Client;
});