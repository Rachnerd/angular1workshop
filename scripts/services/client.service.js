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
    /*
     *  1.3
     */
    this.getById = function (id) {
        return $http.get(base + '/' + id);
    };
    /*
     *  1.8
     */
    this.create = function (client) {
        return $http.post(base, client);
    };
    /*
        1.9
     */
    this.delete = function (id) {
        return $http.delete(base + '/' + id)
    };
    /*
        2.3
     */
    this.put = function (client) {
        return $http.put(base + '/' + client.id, client);
    }
});
