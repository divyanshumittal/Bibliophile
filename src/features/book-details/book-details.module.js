(function(angular) {
    'use strict';
    angular
        .module('app.bookDetails', [])
        .config(BookDetailsConfig);

    // @ngInject
    function BookDetailsConfig($stateProvider) {
        $stateProvider
            .state('app.bookDetails', {
                url: '/bookDetails/:id',
                views: {
                    'appView': {
                        templateUrl: 'features/book-details/book-details.html',
                        controller: 'BookDetailsController as vm'
                    }
                },
                resolve: {
                    book: function($stateParams, goodReadsService) {
                        return {};
                        // return goodReadsService.getBook($stateParams.id).then(function(result) {
                        //         return _.get(result, 'data');
                        //     });
                        }
                },
                data: {
                    authenticate: false
                }
            });
    }
}(angular));
