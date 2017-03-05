    (function(angular) {
        'use strict';
        angular
            .module('app.home')
            .controller('HomeController', HomeController);

        // @ngInject
        function HomeController(AuthService, $stateParams, userService, $ionicUser, $ionicDB) {
            var vm = this;
            var users = $ionicDB.collection('customUsers');

            if ($stateParams.registerForPush && !userService.isRegistered) {
                // if the root state is being reloaded (i.e after login or app restart),
                // register for push again
                var email = $stateParams.googleSignIn ? $ionicUser.social.google.data.email : $ionicUser.details.email;

                users.find({email: email}).fetch().subscribe(function(user) {
                    userService.user = user;
                    users.order("score").findAll({ organization: _.get(userService.user, 'organization')}).watch().subscribe(function(users) {
                        userService.users = users;
                    });
                    AuthService.registerForPushNotifications();
                });

                userService.setupRecommendationWatcher();
                userService.isRegistered = true;
            }
        }
    }(angular));
