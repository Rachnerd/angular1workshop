# Angular 1 workshop
### by Quintor

##Content
This branch contains the solutions of Assignment 2.

##Extra assignments
- In stead of using $http, take a look at $resource.
```javascript
.factory('ClientResource', function ($resource) {
    return $resource('/clients/:id', null,
        {
            update: { method:'PUT' }
        }
    );
});
//GET
ClientResource.query(function (clients) {
    console.log(clients);
})
//GET by id
ClientResource.get({ id: id }, function (client) {
    console.log(client);
})
//PUT
ClientResource.update({id: 1}, {firstName:'R'}, function (client) {
    console.log(client)
})
//POST
var newClient = new ClientResource({firstName: 'Test', lastName: 'User'});
newClient.$save(function(client) {
    console.log(client);
});
```
- One of the preparations for Angular 2 is the removal of the $scope.
```
Configure the routing with controllerAs syntax and get rid of the $scope within the controller.
Beware that the controllerAs name HAS to be in front of every $scope variable in templates.
```

```javascript
$routeProvider.when('/client/:id', {
    controller: 'ClientCtrl',
    templateUrl: './views/client.template.html',
    controllerAs: 'client'
})
//$scope.client becomes
this.client
//{{client}} becomes
{{client.client}}
```