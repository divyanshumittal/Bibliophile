(function(angular) {
    'use strict';
    angular
        .module('app.bookDetails', [])
        .config(BookDetailsConfig);

    // @ngInject
    function BookDetailsConfig($stateProvider) {
        $stateProvider
            .state('app.bookDetails', {
                url: '/bookDetails?id&title',
                views: {
                    'appView': {
                        templateUrl: 'features/book-details/book-details.html',
                        controller: 'BookDetailsController as vm'
                    }
                },
                resolve: {
                    book: function($stateParams, goodReadsService) {
                        return goodReadsService.getBook($stateParams.id, $stateParams.title)
                                  .then(function(result) {
                                      return result;
                                  });
                        }
                },
                data: {
                    authenticate: false
                }
            });
    }
}(angular));
