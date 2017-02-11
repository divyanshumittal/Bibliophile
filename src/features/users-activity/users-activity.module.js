(function(angular) {
    'use strict';
    angular
        .module('app.home.activity', [])
        .config(ActivityConfig);

    // @ngInject
    function ActivityConfig($stateProvider) {
        $stateProvider
            .state('app.home.activity', {
                url: '/activity',
                views: {
                    'activityView': {
                        templateUrl: 'features/users-activity/users-activity.html',
                        controller: 'ActivityController as vm'
                    }
                },
                data: {
                    authenticate: false
                }
            });
    }
}(angular));
