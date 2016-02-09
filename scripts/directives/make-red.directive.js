/*
    2.8
 */
angular.module('myApp')
.directive('makeRed', function ($timeout) {
    return {
        restrict: 'A',
        scope: {},
        /*
            2.9
         */
        link: function ($scope, element, attrs) {
            element.addClass('animate');
            $timeout(function () {
                element.css('color', 'red');
            }, 10);
            //or
            //element[0].style.color = 'red';
        }
    }
});