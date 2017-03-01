    (function(angular) {
        'use strict';
        angular
            .module('app.home.leaderboard')
            .controller('LeaderboardController', LeaderboardController);

        // @ngInject
        function LeaderboardController($window, userService, $ionicDB) {
            var vm = this;
            var users = $ionicDB.collection('customUsers');

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
                users.order('score', 'descending').findAll({ organization: _.get(userService.user, 'organization')}).watch().subscribe(function(users) {
                    vm.users = users;
                    vm.chartData = [{
                        key: "Cumulative Points",
                        values: vm.users.slice(0, 6)
                    }];
                });
            }
        }
    }(angular));
