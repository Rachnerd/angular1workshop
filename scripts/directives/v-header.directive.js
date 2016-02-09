/*
    2.5
 */
angular.module('myApp')
.directive('vHeader', function () {
    return {
        restrict: 'E',
        scope: {
            title: '@'
        },
        templateUrl: './views/v-header.partial.html'
    }
});