    (function(angular) {
        'use strict';
        angular
            .module('app.home')
            .controller('HomeController', HomeController);

        // @ngInject
        function HomeController(AuthService, $stateParams) {
            var vm = this;  

            if ($stateParams.registerForPush) {
             // if the root state is being reloaded (i.e after login or app restart),
             // register for push again
             AuthService.registerForPushNotifications();
            }

        }
    }(angular));
