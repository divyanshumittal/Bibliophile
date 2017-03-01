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
                var email = $stateParams.googleSignIn ? $ionicUser.social.google.data.email : $ionicUser.details.email;

                users.find({email: email}).fetch().subscribe(function(user) {
                    userService.user = user;
                    userService.getAllUsers();
                    AuthService.registerForPushNotifications();
                });
            }
        }
    }(angular));
