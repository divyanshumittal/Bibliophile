    (function(angular) {
        'use strict';
        angular
            .module('app.home.leaderboard')
            .controller('LeaderboardController', LeaderboardController);

        // @ngInject
        function LeaderboardController() {
            var vm = this;

            vm.data = [{
                name: 'John Doe',
                img: '../resources/img/user_icon.png',
                points: 900
            }, {
                name: 'Tom Riddles',
                img: '../resources/img/user_icon.png',
                points: 700
            }]

        }
    }(angular));
