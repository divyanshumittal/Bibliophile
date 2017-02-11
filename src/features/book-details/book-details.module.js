(function(angular) {
    'use strict';
    angular
        .module('app.home.bookDetails', [])
        .config(BookDetailsConfig);

    // @ngInject
    function BookDetailsConfig($stateProvider) {
        $stateProvider
            .state('app.home.bookDetails', {
                url: '/bookDetails',
                views: {
                    'homeView': {
                        templateUrl: 'features/book-details/book-details.html',
                        controller: 'BookDetailsController as vm'
                    }
                },
                data: {
                    authenticate: false
                }
            });
    }
}(angular));
