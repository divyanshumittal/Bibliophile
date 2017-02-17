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
                        axisLabel: 'Users'
                    },
                    yAxis: {
                        axisLabel: 'Points',
                        axisLabelDistance: -10
                    }
                }
            };
             /* Chart data */
            vm.chartData = [{
            key: "Cumulative Points",
            values: [{ 
                  "name" : "John Doe" ,
                  "score" : 900
                } , 
                { 
                  "name" : "Tom Riddles" , 
                  "score" : 700
                }
                ]
            }];

            init();

            function init() {
                userService.getAllUsers(_.get(userService.user, 'organization')).then(function(result) {
                    // set data for list and chart here
                    vm.users = result.data;
                    vm.chartData[0].values = result.data;
                });
            }

            vm.users = [{
                name: 'John Doe',
                img: '../resources/img/user_icon.png',
                score: 900
            }, {
                name: 'Tom Riddles',
                img: '../resources/img/user_icon.png',
                score: 700
            }];
        }
    }(angular));
