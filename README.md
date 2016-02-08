# Angular 1 workshop
### by Quintor

##Content
This branch contains the solutions of Assignment one.

## Assignment 2
Now that our routes are setup and the correct data is retrieved, we need to visualize our data.
The following assignment will let you use the $scope object en some standard Angular 
directives. At the end we make 2 different kind of directives.

2.1 - First we want to render a list of users in our Home template.
```
Create a list in the Home template that renders the clients using ng-repeat.
```

Tips
- [ng-repeat](https://docs.angularjs.org/api/ng/directive/ngRepeat)

2.2 - Our client page is setup to handle the retrieve the correct client based on id. Now we want to be able to click
a client in the home page and redirect to the correct client route.
```
Add click event to each client and make the click redirect to the client/:id page with the appropriate id .
```
Tips
- [ng-click](https://docs.angularjs.org/api/ng/directive/ngClick)
- [$location](https://docs.angularjs.org/api/ng/service/$location)

2.3 - Now that we retrieve the correct client, we want to visualize the client in the template.
```
Add client to the scope and visualize its properties in the template.
```

2.4 - To test our previously created put functionality, we need to make the client properties editable.
```
Create an edit button that allows the user to edit the first and last name of a person.
```
Tips
- Controller can add a boolean to the $scope that can be switched on and off. Based on this boolean you can switch certain html tags on and off.
- [ng-if](https://docs.angularjs.org/api/ng/directive/ngIf)
- [Two-way binding](https://docs.angularjs.org/api/ng/directive/ngModel)

2.5 - We want to save our client after editing.
```
When in edit mode, create a save button that will call the previously made save function of the Client instance.
Log the backend response to see if the client is updated.
```

2.6 - To prevent every controller from having to inject $location and handle redirects.
```
Create a directive called "redirect" (scripts/directives/redirect.directive.js) and configure it so it works like an attribute (restrict A).
```
Tips
```javascript
.directive('redirect', function () {
    return {
        restrict: 'A',
        controller: function ($scope, $location) {

        }
    }
});
```

2.7 - The redirect directive currently does nothing.
```
In the directive's controller function, give the scope a "to" function with url param (use $location like in HomeCtrl).
```

2.8 - We have to replace our previously created redirect function with our new directive. 
```
Now in stead of letting the HomeCtrl change the route on click of a client, let the directive redirect do it.
Client element will still have a click listener, but the redirect attribute in the html element will let the directive inject the "to" function for you (and not the HomeCtrl).
```
Tips
```html
<div redirect>
    <div ng-click="to('url')">Client1</div>
</div>
```

2.9 - Next we want to create a header with functionality that can be used on every page. To prevent duplicated HTML we are going to create a directive.
```
Create a directive scripts/directives/header.directive.js Configure the directive so it becomes an Element (restrict: 'E'), isolate the scope and create a partial (template) for it.
```
Tips
- Scope isolation: scope: {}

2.10 - Inside the header partial create a button that redirects on click back to the home page (with help of the redirect directive).

2.11 - To see if the button works we have to add the header to our pages.
```
Add a <header></header> tag in the home and client template (if button doesn't show something went wrong).
```
