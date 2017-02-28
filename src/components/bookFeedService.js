    (function(angular) {
        'use strict';
        angular
            .module('app')
            .service('bookfeedService', bookfeedService);

        // @ngInject
        function bookfeedService($http, $q, $ionicPopup, $ionicDB, userService) {
            var self = this;
            var bookfeeds = $ionicDB.collection('bookfeeds');
            var recommendations = $ionicDB.collection('recommendations');

            self.createBookfeed = createBookfeed;
            self.createRecommendation = createRecommendation;

            function createBookfeed(bookfeedObj) {
                var statusStr = '';

                if (bookfeedObj.status === 'READ') {
                    statusStr = ' moved to Read';
                } else if (bookfeedObj.status === 'QUEUE') {
                    statusStr = ' added to Queue';
                } else if (bookfeedObj.status === 'STARTED_READING') {
                    statusStr = ' moved to Currently reading list';
                } else if(bookfeedObj.status === 'RECOMMENDED') {
                    statusStr = ' recommended';
                }

                $ionicPopup.alert({
                     title: bookfeedObj.title + statusStr
                });

                bookfeeds.store(bookfeedObj);
            }

            function createRecommendation(recommendation) {
                recommendations.store(recommendation);
            }
        }
    }(angular));
