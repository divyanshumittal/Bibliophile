    (function(angular) {
        'use strict';
        angular
            .module('app.home')
            .controller('HomeController', HomeController);

        // @ngInject
        function HomeController($ionicTabsDelegate, $timeout) {
            var vm = this;  

             // $timeout( function() {
             //    $ionicTabsDelegate.select(0, false);    
             //  },400);
        }
    }(angular));
