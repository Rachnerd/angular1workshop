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
- Check home.controller.js.

###1.2
To assign the controller to a page we need to create a new route config (like in HomeCtrl) and a template.
```
Let ClientCtrl handle the /client/:id route and create and assign a client template.
```
Tips
- Check home.controller.js.

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
- ```javascript
    resolve: {
        client: function () {
            return true; // Expects a promise that determines of the route will succeed.
        }
    }
```

##1.6
Create a service called ClientLoader that contains a load function and a client variable.
The load function has a parameter id and returns ClientService's getById(id). This load service is only interested in
the succeeding GET request so it only adds the success handler to ClientService.getById(id) client from the server.
This success handler should set the client variable of the ClientLoader.
Failed requests will still return a failed promise.

```javascript
var service = this;
return ClientService.getById(id).then(function (response) {
    service.client = response.data;
});
```
1.7 -