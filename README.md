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

## Assignment 2
The focus of this assignment is data binding and directives.

2.1 - Create a list in the Home template that renders the clients using [ng-repeat](https://docs.angularjs.org/api/ng/directive/ngRepeat).

2.2 - Add click event to each client and make the click redirect to the client/:id page with the appropriate id [$location](https://docs.angularjs.org/api/ng/service/$location).

2.3 - In the client template visualize all client properties including contract and usage.

2.4 - Create an edit button that allows the user to edit the first and last name of a person. [Two-way binding](https://docs.angularjs.org/api/ng/directive/ngModel)

2.5 - When in edit mode, create a save button that will send the PUT request to the server through the ClientService.

2.6 - Create a directive called "redirect" (scripts/directives/redirect.directive.js) and configure it so it works like an attribute (restrict A).

2.7 - In the directive's controller function, give the scope a "to" function with url param (use $location like in HomeCtrl).

2.8 - Now in stead of letting the HomeCtrl change the route on click of a client, let the directive redirect do it.
 Client element will still have a click listener, but the redirect attribute in the html element will let the directive inject the "to" function for you (and not the HomeCtrl). So ng-click="to(url)".

2.9 - Create a directive scripts/directives/header.directive.js Configure the directive so it becomes an Element (restrict: 'E'), isolate the scope and create a partial (template) for it.

2.10 - Inside the header partial create a button that redirects on click back to the home page (with help of the redirect directive).
