(function (angular) {
    'use strict';

    angular.module('app.auth')
        .service('AuthService', AuthService);

    function AuthService($ionicPush, $ionicUser, userService, $ionicDB) {
        var self = this;
        var users = $ionicDB.collection('customUsers');
 
        self.isAuthenticated = isAuthenticated;
        self.registerForPushNotifications = registerForPushNotifications;

        function isAuthenticated () {
            return true;
        }

        function registerForPushNotifications() {
            $ionicPush.register()
                .then(function(t) {
                    return $ionicPush.saveToken(t);
                }).then(function(t) {
                    console.log('ionic id', $ionicUser.id);
                    // might need to copy $ionicUser to userService.user when the app is reloaded if userService.user is undefined
                    
                    if (!userService.user.ionicId) {
                        userService.user.ionicId = $ionicUser.id;
                        users.update(userService.user);
                    }
                });
        }
    }
}(angular));
