    (function(angular) {
        'use strict';
        angular
            .module('app')
            .service('bookfeedService', bookfeedService);

        // @ngInject
        function bookfeedService($http, $q) {
            var self = this;  

            self.getAllFeeds = getAllFeeds;
            self.getBooks = getBooks;
            self.createBookfeed = createBookfeed;

            function getAllFeeds(userId) {
                var defer = $q.defer();

                $http({
                    method: 'GET',
                    url: '/api/v1/bookfeed/showfeed',
                    params: {
                        userId: userId
                    }
                }).then(function(res) {
                    defer.resolve(res);
                }, function(err) {
                    console.log('error', err);
                    defer.reject(err);
                });

                return defer.promise;
            }

            function getBooks(userId, status) {
                var defer = $q.defer();

                $http({
                    method: 'GET',
                    url: '/api/v1/bookfeed/_search',
                    params: {
                        userId: userId,
                        status: status,
                        page: 0,
                        size: 1000,
                        sortOrder: 'desc',
                        sortBy: 'createdDate'
                    }
                }).then(function(res) {
                    defer.resolve(res);
                }, function(err) {
                    console.log('error', err);
                    defer.reject(err);
                });

                return defer.promise;
            }

            function createBookfeed(bookfeedObj) {
                var defer = $q.defer();

                $http({
                    method: 'POST',
                    url: '/api/v1/bookfeed',
                    data: bookfeedObj
                }).then(function(res) {
                    defer.resolve(res);
                }, function(err) {
                    console.log('error', err);
                    defer.reject(err);
                });

                return defer.promise;
            }
        }
    }(angular));
