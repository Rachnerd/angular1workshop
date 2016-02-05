/**
 * Created by rheimbach on 1/27/2016.
 */
/**
 *  Client module with v prefix for avoiding possible name collisions.
 *  Module creation without dependencies.
 */
angular.module('vClient', [])
/**
 *  Service that contains all client related backend communication.
 */
.service('ClientService', function ($http) {
    var base = '/clients';
    /**
     * Get request that retrieves all clients.
     * @returns {HttpPromise}
     */
    this.get = function () {
        return $http.get(base);
    };

    this.getById = function (id) {
        return $http.get(base + '/' + id);
    };

    this.put = function (id, params) {
        return $http.put(base + '/' + id, params);
    };

    this.delete = function (id) {
        return $http.delete(base + '/' + id);
    };
});
