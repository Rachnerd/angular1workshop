# Angular 1 workshop
### by Quintor
This workshop serves as an introduction to the Angular (v1.4.9) framework. During this workshop there will be requests sent to 
a [fake backed module](../master/libs/fake-backend.js).  The fake-backend should not be edited, but it's recommended to take a
look at it. Available url's:
```
GET     /clients        | Returns all clients without additional information
GET     /clients/:id    | Returns one single client including additional information.
POST    /clients        | Creates a new client.
PUT     /clients/:id    | Updates existing client.
DELETE  /clients/:id    | Deletes existing client.
```

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
## Part 1
Currently the application only has one route (page). During this assignment we will add another page that retrieves a single client based on the 
requested id. 

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
- The fake backend expects a GET request url: '/clients/id' (id being a number, 1 + 2 are available, 3 + returns an error).

###1.4
To test our getById function we need to retrieve the :id parameter from our client route.
```
Retrieve a client based on the id of the url and log it (ClientCtrl).
```
Tips
- Inject [$routeParams](https://docs.angularjs.org/api/ngRoute/service/$routeParams) and log it.

###1.5
If we get to the client route with a non existing id, we want to redirect back to the home page.
```
Catch the getById promise and let the controller redirect back to the home page.
```
Tips
- [$location]()

## Part 2
Now that we setup the routes and retrieved the correct client for our client page, we want to visualize our data.

The following subjects will be implemented and configured:
- [Angular directives]()
- [post]()
- [delete]()


###1.6
First we're going to visualize a list of clients on the Home page.
```
Assign the remote clients to the $scope and render them in the home template with help of ng-repeat.
Give the list an id called: client-list.
Give each client a class name: client.
```

Tips
```html
<ul id="client-list">
    <li class="client" ng-repeat"..."></li>
</ul>
```

Tips
- [ng-repeat]()

###1.7
To add a client we're going to create a form.
```
Create a form with 2 inputs for firstName and lastName and a create button (preferably above the client-list).
```

###1.8
Before we can add a person, we have to create a post function in the ClientService.
```
Add post functionality to the ClientService and let the home controller pass it to the $scope as a create function.
Assign the $scope create function to the form submit button. Make sure that if the create is executed the response data (client)
gets added to the client list (in the $scope).
```

Tips
- [$http.post]()

###1.9
Besides adding people to our list, we also want to be able to delete them.
```
Create a delete request in the ClientService. 
Make deletion of a client in the HomeCtrl possible (remote AND $scope). 
```

Tips
- In stead of showing a delete button at every client, try to make it only visible for a selected client with help of
[ng-show]() or [ng-if]().

###1.10
Now that we can add and delete people we want to be able to edit them in our client page.
```
Add a click event to every client (a button or clickable name) that redirects the page to the client route with correct id.
```

Tips
- [$location]()
