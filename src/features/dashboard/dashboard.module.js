(function(angular) {
    'use strict';
    angular
        .module('app.home.dashboard', [])
        .config(dashboardConfig);

    // @ngInject
    function dashboardConfig($stateProvider) {
        $stateProvider
            .state('app.home.dashboard', {
                url: '/dashboard',
                views: {
                    'dashboardView': {
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
