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

1.1 - Create a new ClientCtrl on the myApp module in a new file (scripts/controllers/client.controller.js).

1.2 - Make ClientCtrl handle the /client/:id route and create and assign a client template.

1.3 - Add get by id functionality to the ClientService (remote url: '/clients/' + id)

1.4 - Retrieve a client based on the id of the url ([$routeParams](https://docs.angularjs.org/api/ngRoute/service/$routeParams)).

1.5 - Add PUT and DELETE functionality in the ClientService and test if it works.