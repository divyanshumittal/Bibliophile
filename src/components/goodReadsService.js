    (function(angular) {
        'use strict';
        angular
            .module('app.home')
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
                    url: 'https://www.goodreads.com/search/index.xml',
                    params: {
                        key: self.devKey,
                        q: query
                    }
                }).then(function(res) {
                    console.log(res);
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
                    url: 'https://www.goodreads.com/search/index.xml',
                    params: {
                        key: self.devKey,
                        id: bookId
                    }
                }).then(function(res) {
                    console.log(res);
                    defer.resolve(res);
                }, function(err) {
                    console.log('error', err);
                    defer.reject(err);
                });

                return defer.promise;
            }
        }
    }(angular));
