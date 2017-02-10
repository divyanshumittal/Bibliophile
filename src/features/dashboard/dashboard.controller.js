    (function(angular) {
        'use strict';
        angular
            .module('app.home.dashboard')
            .controller('DashboardController', DashboardController);

        // @ngInject
        function DashboardController($window, AuthService, $state) {
            var vm = this;  
         
            /* Chart options */
            vm.options = {
                chart: {
                    type: 'discreteBarChart',
                    height: 450,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 55
                    },
                    x : function(d) { return d.x; },
                    y : function(d) { return d.y; },
                    showValues: true,
                    valueFormat: function(d){
                        return d3.format(',.4f')(d);
                    },
                    transitionDuration: 500,
                    xAxis: {
                        axisLabel: 'Date/Time',
                        ticks : d3.time.months, // <-- add formatter for the ticks
                        tickFormat : function(d) {
                        return d3.time.format('%m-%y')(new Date(d))
                        }
                    },
                    yAxis: {
                        axisLabel: 'Logins'
                    }
                }
            };

            /* Chart data */
            vm.data = [{
            key: "Cumulative Return",
            values: [
                {x:1359072000000, y:10},
                {x:1365116400000, y:30},
                {x:1357516800000, y:40}
                ]
            }];

        }
    }(angular));
