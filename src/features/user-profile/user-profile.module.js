(function(angular) {
    'use strict';
    angular
        .module('app.userProfile', [])
        .config(userProfileConfig);

    // @ngInject
    function userProfileConfig($stateProvider) {
        $stateProvider
            .state('app.userProfile', {
                url: '/userProfile',
                views: {
                    'appView': {
                        templateUrl: 'features/user-profile/user-profile.html',
                        controller: 'UserProfileController as vm'
                    }
                },
                data: {
                    authenticate: false
                }
            });
    }
}(angular));
