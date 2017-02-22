    (function(angular) {
        'use strict';
        angular
            .module('app.home.leaderboard')
            .controller('LeaderboardController', LeaderboardController);

        // @ngInject
        function LeaderboardController($window, userService) {
            var vm = this;

            vm.toggleChart = false;
            vm.options = {
                chart: {
                    height: $window.innerHeight - 200,
                    type: 'discreteBarChart',
                    x : function(d) { return d.name; },
                    y : function(d) { return d.score; },
                    showValues: true,
                    transitionDuration: 500,
                    xAxis: {
                        axisLabel: 'Users',
                        staggerLabels: true
                    },
                    yAxis: {
                        axisLabel: 'Points',
                        axisLabelDistance: -10
                    }
                }
            };

            init();

            function init() {
                userService.getAllUsers(_.get(userService.user, 'organization')).then(function(result) {
                    // set data for list and chart here
                    vm.users = result.data;
                    vm.chartData = [{
                        key: "Cumulative Points",
                        values: result.data.slice(1, 6)
                    }];
                    _.forEach(vm.users, function(user) {
                        user.img = 'resources/img/user_icon.png';
                    });
                });
            }

            // vm.users = [{
            //     name: 'John Doe',
            //     img: '../resources/img/user_icon.png',
            //     score: 900
            // }, {
            //     name: 'Tom Riddles',
            //     img: '../resources/img/user_icon.png',
            //     score: 700
            // }];
        }
    }(angular));
