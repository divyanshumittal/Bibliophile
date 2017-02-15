    (function(angular) {
        'use strict';
        angular
            .module('app.home.leaderboard')
            .controller('LeaderboardController', LeaderboardController);

        // @ngInject
        function LeaderboardController($window) {
            var vm = this;

            vm.toggleChart = false;

            vm.options = {
                chart: {
                    height: $window.innerHeight - 200,
                    type: 'discreteBarChart',
                    x : function(d) { return d.label; },
                    y : function(d) { return d.value; },
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
                  "label" : "John Doe" ,
                  "value" : 900
                } , 
                { 
                  "label" : "Tom Riddles" , 
                  "value" : 700
                }
                ]
            }];

            vm.data = [{
                name: 'John Doe',
                img: '../resources/img/user_icon.png',
                points: 900
            }, {
                name: 'Tom Riddles',
                img: '../resources/img/user_icon.png',
                points: 700
            }];
        }
    }(angular));
