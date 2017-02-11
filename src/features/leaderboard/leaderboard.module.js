(function(angular) {
    'use strict';
    angular
        .module('app.home.leaderboard', [])
        .config(leaderboardConfig);

    // @ngInject
    function leaderboardConfig($stateProvider) {
        $stateProvider
            .state('app.home.leaderboard', {
                url: '/leaderboard',
                views: {
                    'homeView': {
                        templateUrl: 'features/leaderboard/leaderboard.html',
                        controller: 'LeaderboardController as vm'
                    }
                },
                data: {
                    authenticate: false
                }
            });
    }
}(angular));
