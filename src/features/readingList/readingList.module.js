(function(angular) {
    'use strict';
    angular
        .module('app.readingList', [])
        .config(readingListConfig);

    // @ngInject
    function readingListConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.readingList', {
                url: '/readingList',
                views: {
                    'appView': {
                        templateUrl: 'features/readingList/readingList.html',
                        controller: 'ReadingListController as vm'
                    }
                },
                data: {
                    authenticate: true
                }
            });

    }
}(angular));
