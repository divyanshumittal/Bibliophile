(function(angular) {
    'use strict';
    angular
        .module('app.dashboard', [])
        .config(dashboardConfig);

    // @ngInject
    function dashboardConfig($stateProvider) {
        $stateProvider
            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    'appView': {
                        templateUrl: 'features/dashboard/dashboard.html',
                        controller: 'DashboardController as vm'
                    }
                },
                data: {
                    authenticate: false
                }
            });
    }
}(angular));
