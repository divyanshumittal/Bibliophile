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
                    url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fwww.goodreads.com%2Fsearch%2Findex.xml%3Fkey%3D"
                          + self.devKey + "%26query%3D"
                          + query + "'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
                }).then(function(res) {
                    defer.resolve(parseBooksJSON(res));
                }, function(err) {
                    console.log('error', err);
                    defer.reject(err);
                });

                return defer.promise;
            }

            function getBook(bookId, title) {
                var defer = $q.defer();

                $http({
                    method: 'GET',
                    url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fwww.goodreads.com%2Fbook%2Fshow.xml%3Fid%3D"
                    + bookId + "%26key%3D" + self.devKey + "'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
                }).then(function(res) {
                    defer.resolve(parseSingleBookJSON(res, title));
                }, function(err) {
                    console.log('error', err);
                    defer.reject(err);
                });

                return defer.promise;
            }

            function parseBooksJSON(res) {
              var booksObjs = _.get(res, ['data', 'query', 'results', 'body', 'goodreadsresponse', 'search', 'results', 'work']);
              var books = [];

              _.map(booksObjs, function(bookObj) {
                var book = {
                  goodReadsId: _.get(bookObj, ['best_book', 'id', 'content']),
                  title: _.get(bookObj, ['best_book', 'content'], '').replace(/^\s*[\r\n]/gm, "")
                }

                if (book.goodReadsId && book.title) {
                    books.push(book);
                }
              });

              return books;
            }

            function parseSingleBookJSON(res, title) {
              var bookObj = _.get(res, ['data', 'query', 'results', 'body', 'goodreadsresponse', 'book']);
              console.log(res);
              var book = {
                  title: title,
                  authorName: _.get(bookObj, ['authors', 'author', 'name'],
                              _.get(bookObj, ['authors', 'author', '0', 'name'], 'N/A')),
                  bookPoints: bookPointCalculator(bookObj.average_rating),
                  imageUrl: bookObj.image_url,
                  description: _.get(bookObj, ['description', 'content']),
                  releaseDate: bookObj.publication_month + '/' + bookObj.publication_day
                    + '/' + bookObj.publication_year
              };

              return book;
            }

            function bookPointCalculator(average_rating) {
                return parseInt(average_rating) * 20;
            }
        }
    }(angular));
