# Angular 1 workshop
### by Quintor
This workshop serves as an introduction to the Angular (v1.4.9) framework. During this workshop there will be requests sent to 
a [fake backed module](../master/libs/fake-backend.js).  The fake-backend should not be edited, but it's recommended to take a
look into it.

## Content
This branch contains the base code of the workshop. This base consists of one application module [myApp](../master/scripts/app.js), one 
controller [HomeCtrl](../master/scripts/controllers/home.controller.js) and one service [ClientService](../master/scripts/services/client.service.js) (packaged in a vClient module).

[myApp](../master/scripts/app.js) is the actual application module. It starts our application and is attached to the body of our [index.html](../master/index.html) (see ng-app). This module 
contains all dependencies needed in our application so far ([angular](../master/libs/angular.js), [angular-route](../master/libs/angular-route.js), [fake-backend](../master/libs/fake-backend.js), [vClient](../master/scripts/services/client.service.js)).

[ClientService](../master/scripts/services/client.service.js) uses the basic [$http](https://docs.angularjs.org/api/ng/service/$http) service and has a get function that retrieves the clients from the fakeBackend.

[HomeCtrl](../master/scripts/controllers/home.controller.js) assigns the url '/' to it's template and controller. The HomeCtrl has the ClientService as dependency and calls
the get function to log the response.

## Run
Start a web server and open the index.html in localhost.

## Debugging
Open developer tools in your browser (chrome/ff -> f12, safari -> enable developer tools)

## Assignment 1
The focus of the first assignment is routing and the use of controllers/services/factories.
At the end of this assignment routes/controllers are created and configured.

###1.1
Before we can add another page we have to create a new controller.
```
Create a new ClientCtrl attached to myApp module in a new file (scripts/controllers/client.controller.js).
```
Tips
- [HomeCtrl](../master/scripts/controllers/home.controller.js)

###1.2
To assign the controller to a page we need to create a new route config and a template.
```
Let ClientCtrl handle the /client/:id route and create and assign a client template.
```
Tips
- [HomeCtrl](../master/scripts/controllers/home.controller.js)

###1.3
If we want to load an individual client for the client page, we need to add a getById function to our ClientService.
```
Add get by id functionality to the ClientService.
```
Tips
- The fake backend expects a GET request url: '/clients/id' (id being a number, 1 + 2 are available, 3+ returns an error).

###1.4
To test our get by id functionality, we need to let the ClientCtrl retrieve a param from the route.
```
Retrieve a client based on the id of the url and log it.
```
Tips
- [$routeParams](https://docs.angularjs.org/api/ngRoute/service/$routeParams)

##1.5
Currently the '/client/:id' route gets loaded regardless of the availability of the remote client. To prevent the page (controller) from
being called, we can set a condition in our routing config for loading the route using resolve.
```
Create a resolve function in the Client route config.
```
Tips
```javascript
templateUrl: './views/client.template.html',
resolve: {
    client: function () {
        return true; // Expects a promise that determines if the route will succeed.
    }
}
```

##1.6
The goal of this client resolve is to load the client before the page loads. To prevent the controller from sending
the same request for retrieving the client, we need to make a ClientLoader service that does this once. The ClientLoader
can then be shared between the resolve function and the ClientCtrl where the resolve function does the loading and the
controller simply retrieves the set client.

```
Create a ClientLoader service that has a load function and a client variable bound to itself.
The load function has to return the ClientService's getById(id) promise and add a success handler to it.
The fail handler shouldn't be set because we want to send that through to the caller of the load function (resolve in this case).
If the getById succeeds, the ClientLoader should set its client variable.
```
Tips
```javascript
var service = this;
function differentScopeFunction (response) {
    service.client = response.data;
}
```

##1.7
If everything is setup correctly, the resolve function can now return a load function and the ClientCtrl can retrieve an already loaded client.
```javascript
resolve: {
    client: function (ClientLoader) {
        return ClientLoader.load(1);
    }
}
```
```javascript
.controller('ClientCtrl', function (ClientLoader) {
    console.log(ClientLoader.client);
```

```javascript
.service('ClientLoader', function (ClientService, Client) {
    this.client = null;
    this.load = function (id) {
        var service = this;
        return ClientService.getById(id).then(function (response) {
            service.client = response.data;
        });
    }
})
```

Now we need to get rid of the number 1 by retrieving the id of the routing attempt.
```
Make the resolve dynamic.
```
Tips
- $routeParams can only check the current url's params. Since the routing isn't completed yet, $route is the dependency needed to get the id.
```javascript
$route.current.params
```

##1.8
To illustrate the difference between a factory and service, we're going to create a Client factory. The purpose of this factory is casting
a plain JS object to an instance of Client.
```javascript
.factory('Client', function () {
    function Client(client) {
        angular.extend(this, client);
    }
    return Client;
})
```
This factory returns a Client function that binds the retrieved client properties to itself.
```
Create a save function for the Client function that will send a put request to '/clients/id' with itself as parameter.
```
Tips
```javascript
Client.prototype.save = function () {};
```
- [$http.put](https://docs.angularjs.org/api/ng/service/$http#put)

##1.9
To test our Client factory we fist need to make sure that our ClientLoader doesn't set the client as a js object, but
as an instance of Client. Client (factory) returns a Client function that can be instantiated.
This means the Client (factory) dependency can be instantiated directly.
```
Change the way ClientLoader sets its client.
Let the ClientController change the name of the client and call the save function.
Since the save function is a promise, add a success handler that logs the response.data.
If everything worked you should receive an updated client from the server.
```
Tips
```javascript
function (Client) {
    new Client(response.data);
}
```