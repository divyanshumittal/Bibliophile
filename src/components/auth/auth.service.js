(function (angular) {
    'use strict';

    angular.module('app.auth')
        .service('AuthService', AuthService);

    function AuthService($ionicPush, $state, $ionicUser, userService) {
        var self = this;
 
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
                     // save this on your user object
                     console.log('ionic id', $ionicUser.id);
                     // might need to copy $ionicUser to userService.user when the app is reloaded if userService.user is undefined
                     userService.user.ionicId = $ionicUser.id;
                     // save user on backend with this ionic id
                 });
         }
    }
}(angular));
