    (function(angular) {
        'use strict';
        angular
            .module('app')
            .service('goodReadsService', goodReadsService);

        // @ngInject
        function goodReadsService($http, $q) {
            var self = this;  

            self.devKey = 'jhZOsAHmozaMo9GZKbDQg';
            self.getBook = getBook;
            self.getBooks = getBooks;

            function getBooks(query) {
                var defer = $q.defer();

                $http({
                    method: 'GET',
                    url: '/api/v1/search/names',
                    params: {
                        key: self.devKey,
                        query: query
                    }
                }).then(function(res) {
                    defer.resolve(res);
                }, function(err) {
                    console.log('error', err);
                    defer.reject(err);
                });

                return defer.promise;
            }

            function getBook(bookId) {
                var defer = $q.defer();

                $http({
                    method: 'GET',
                    url: '/api/v1/search/findbook',
                    params: {
                        key: self.devKey,
                        query: bookId
                    }
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
