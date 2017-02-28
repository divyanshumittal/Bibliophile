    (function(angular) {
        'use strict';
        angular
            .module('app.home')
            .controller('HomeController', HomeController);

        // @ngInject
        function HomeController(AuthService, $stateParams, userService, $ionicUser, $ionicDB) {
            var vm = this;
            var users = $ionicDB.collection('customUsers');

            if ($stateParams.registerForPush) {
                // if the root state is being reloaded (i.e after login or app restart),
                // register for push again

                users.find({email: $ionicUser.details.email}).fetch().subscribe(function(user) {
                    userService.user = user;
                    userService.getAllUsers();
                    AuthService.registerForPushNotifications();
                });
            }
        }
    }(angular));
