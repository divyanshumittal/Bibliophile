(function(angular) {
    'use strict';
    angular
        .module('app.register', [])
        .config(registerConfig);

    // @ngInject
    function registerConfig($stateProvider) {
        $stateProvider
            .state('app.register', {
                url: '/register',
                views: {
                    'appView': {
                        templateUrl: 'features/register/register.html',
                        controller: 'RegisterController as vm'
                    }
                }
            });
    }
}(angular));
