/**
 * Created by rheimbach on 1/27/2016.
 */
/**
 *  Client module with v prefix for avoiding possible name collisions.
 *  Module creation without dependencies.
 */
angular.module('vClient', [])
.service('ClientService', function ($http) {
    var base = '/clients';
    /**
     * Get request that retrieves all clients.
     * @returns {HttpPromise}
     */
    this.get = function () {
        return $http.get(base);
    };
});
