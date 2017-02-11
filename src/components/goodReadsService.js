    (function(angular) {
        'use strict';
        angular
            .module('app.home')
            .service('goodReadsService', goodReadsService);

        // @ngInject
        function goodReadsService($http, $q) {
            var self = this;  

            self.getBooks = getBooks;

            function getBooks(query) {
                var defer = $q.defer();
                var devKey = 'jhZOsAHmozaMo9GZKbDQg';

                $http({
                    method: 'GET',
                    url: 'https://www.goodreads.com/search/index.xml',
                    params: {
                        key: devKey,
                        q: query
                    },
                    data: ''

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
