(function(angular) {
    'use strict';

    angular.module('app')
        .run(runConfig);

    // @ngInject
    function runConfig($ionicPlatform, $cordovaStatusbar, $window, $rootScope, $cordovaDialogs) {
        $ionicPlatform.ready(function () {
            // register for analytics when not dev mode
            // if(!CONFIG.devMode) { }

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if ($window.navigator.splashscreen) $window.navigator.splashscreen.hide();
        

            if ($window.StatusBar) {
                // org.apache.cordova.statusbar required
                $cordovaStatusbar.style(1);
            }

            if ($window.cordova && $window.cordova.logger) {
                $window.cordova.logger.__onDeviceReady();
            }

           $rootScope.$on('cloud:push:notification', function(event, data) {
                var msg = data.message;
                $cordovaDialogs.alert(msg.text, msg.title, 'Okay').
                    then(function() {

                    });
            });

        });

        $window.addEventListener('native.keyboardshow', function(){
            $window.document.body.classList.add('keyboard-open');
        });
    }
}(angular));
