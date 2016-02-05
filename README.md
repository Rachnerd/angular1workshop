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
The focus of the first assignment is routing and the use of controllers/services.
At the end of this assignment routes/controllers are created and configured.

- Display a list of clients in the HomePage using [ng-repeat](https://docs.angularjs.org/api/ng/directive/ngRepeat).
- Make HomeCtrl GET a client by id through the ClientService (remote url: /clients/1).
- Create a new ClientCtrl on the myApp module in a new file (scripts/controllers/client.controller.js).
- Make ClientCtrl handle the /client/:id route and create and assign a client template.
- Move the get by id call from HomeCtrl to ClientCtrl.
- Visualize the client in the client template based on the id in the url ([$routeParams](https://docs.angularjs.org/api/ngRoute/service/$routeParams)).
- Add a click handler to every user on the Home page that will redirect ([$location](https://docs.angularjs.org/api/ng/service/$location)) to the appropriate client/:id url.