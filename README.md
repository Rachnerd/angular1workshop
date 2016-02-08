# Angular 1 workshop
### by Quintor

##Content
This branch contains the solutions of Assignment one.

## Assignment 2
Now that our routes are setup and the correct data is retrieved, we need to visualize our data.
The following assignment will let you use the $scope object en some standard Angular 
directives. At the end we make 2 different kind of directives.

2.1 - Create a list in the Home template that renders the clients using [ng-repeat](https://docs.angularjs.org/api/ng/directive/ngRepeat).

2.2 - Add [click event](https://docs.angularjs.org/api/ng/directive/ngClick) to each client and make the click redirect to the client/:id page with the appropriate id [$location](https://docs.angularjs.org/api/ng/service/$location).

2.3 - In the client template visualize all client properties including contract and usage.

2.4 - Create an edit button that allows the user to edit the first and last name of a person. [ng-if](https://docs.angularjs.org/api/ng/directive/ngIf) [Two-way binding](https://docs.angularjs.org/api/ng/directive/ngModel) 

2.5 - When in edit mode, create a save button that will call the previously made save function of the Client instance.

2.6 - Create a directive called "redirect" (scripts/directives/redirect.directive.js) and configure it so it works like an attribute (restrict A).

2.7 - In the directive's controller function, give the scope a "to" function with url param (use $location like in HomeCtrl).

2.8 - Now in stead of letting the HomeCtrl change the route on click of a client, let the directive redirect do it.
 Client element will still have a click listener, but the redirect attribute in the html element will let the directive inject the "to" function for you (and not the HomeCtrl). So ng-click="to(url)".

2.9 - Create a directive scripts/directives/header.directive.js Configure the directive so it becomes an Element (restrict: 'E'), isolate the scope and create a partial (template) for it.

2.10 - Inside the header partial create a button that redirects on click back to the home page (with help of the redirect directive).

2.11 - Add a <header></header> tag in the home and client template (if button doesn't show something went wrong).
