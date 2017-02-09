(function(angular) {
    'use strict';
    angular
        .module('app.activity', [])
        .config(ActivityConfig);

    // @ngInject
    function ActivityConfig($stateProvider) {
        $stateProvider
            .state('app.activity', {
                url: '/activity',
                views: {
                    'appView': {
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
