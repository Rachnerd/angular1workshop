# Angular 1 workshop
### by Quintor

##Content
This branch contains the solutions of Assignment one.

## Assignment 2
In the previous assignment we've setup get/getById/create/delete functionality.
Now we also want to be able to edit existing clients in the client page.
After we've realized the full CRUD functionality, we are going to make some
custom directives.

###Part 1
###2.1
Client controller receives the correct client, but its properties aren't visualized yet.
```
Add client to the scope and visualize its properties in the template (including contract).
```

###2.2 
To be able to edit a client's properties, we have to toggle between normal visualization and properties in a form.
```
Make it possible to toggle between normal mode and edit mode.
While in edit mode, let the first and last name be in the form of inputfields.
```

Tips
- [ng-if](https://docs.angularjs.org/api/ng/directive/ngIf)
- [Two-way binding](https://docs.angularjs.org/api/ng/directive/ngModel)

###2.3
We want to be able to edit the remote client as well. For this we need a put method.
```
Create a put method in ClientService
```
Tips
- [$http.put]()

###2.4
Now, while in edit mode we want to save the adjusted fields.
```
When in edit mode, create a save button that will call the previously made save function of the Client instance.
Log the backend response to see if the client is updated (this time we don't have to set the client in the $scope because 
of the two-way bind).
```

###Part 2
###2.5

