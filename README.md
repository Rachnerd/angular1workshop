# Angular 1 workshop
### by Quintor
This workshop serves as an introduction to the Angular (v1.4.9) framework. During this workshop there will be requests sent to 
a [fake backed module](../master/libs/fake-backend.js).  The fake-backend should not be edited, but it's recommended to take a
look into it.

## Run
Start a web server and open the index.html in localhost.

## Debugging
Open developer tools in your browser (chrome/ff -> f12, safari -> enable developer tools)

## Content
This branch contains the base code of the workshop. This base consists of one application module [myApp](../master/scripts/app.js), one 
controller [HomeCtrl](../master/scripts/controllers/home.controller.js) and one service [ClientService](../master/scripts/services/client.service.js) (packaged in a vClient module).

[myApp](../master/scripts/app.js) is the actual application module. It starts our application and is attached to the body of our [index.html](../master/index.html) (see ng-app). This module 
contains all dependencies needed in our application so far ([angular](../master/libs/angular.js), [angular-route](../master/libs/angular-route.js), [fake-backend](../master/libs/fake-backend.js), [vClient](../master/scripts/services/client.service.js)).

[ClientService](../master/scripts/services/client.service.js) uses the basic [$http](https://docs.angularjs.org/api/ng/service/$http) service and has a get function that retrieves the clients from the fakeBackend.

[HomeCtrl](../master/scripts/controllers/home.controller.js) assigns the url '/' to it's template and controller. The HomeCtrl injects the ClientService and calls
the get function to log the response.

## Assignment 1
Currently the application only has one route (page). During this assignment we will add another page that retrieves a single client based on the 
requested id. 

The goal is to configure the routing of that page to request the client before the route succeeds and the controller gets loaded.

To prevent the controller from having to request the client again to gain access to it, we need to create a service (singleton) that is sharable between
the route config and the controller (dependency injection). The route config will ask our service to request the client based on id, then the service will save the response so
the controller can simply ask for an already loaded client. 

To add some functionality to the client object we will make a Client factory that will return
an instantiable Client function that has some custom functionality in its prototype.

The following subjects will be implemented and configured:
-  [Routes](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider)/[controllers](https://docs.angularjs.org/guide/controller)
-  [$http service](https://docs.angularjs.org/api/ng/service/$http) GET/PUT [promises](https://docs.angularjs.org/api/ng/service/$q#the-promise-api)
-  [Services/Factories](https://docs.angularjs.org/guide/services)

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
Before we want to setup the condition for loading the page we need to test the getById function.
```
Retrieve a client based on the id of the url and log it (ClientCtrl).
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
- Setting a service variable in an anonymous function
```javascript
var service = this;
(function differentScopeFunction (response) {
    service.client = response.data;
})
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
Create a put function in the ClientService that will send a client to '/clients/' + id.
Create a save function in the Client factory that will call the previously created put function with itself as parameter.
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