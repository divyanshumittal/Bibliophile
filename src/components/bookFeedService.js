    (function(angular) {
        'use strict';
        angular
            .module('app')
            .service('bookfeedService', bookfeedService);

        // @ngInject
        function bookfeedService($ionicPopup, $ionicDB, $http, $q, userService) {
            var self = this;
            var bookfeeds = $ionicDB.collection('bookfeeds');
            var recommendations = $ionicDB.collection('recommendations');

            self.createBookfeed = createBookfeed;
            self.createRecommendation = createRecommendation;
            self.sendNotification = sendNotification;

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


            function sendNotification(title, recommendedTo) {
              var defer = $q.defer();
              var jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ODhjYTdlNC00NzY5LTQ5ZWMtYjg3Yi01NjRjZDI4NDBhYWUifQ.6IJJqAxOMlJWeaMc3FUWrO-5x1iiULOc4uOg-9BiPg0';

              $http({
                  method: 'POST',
                  url: 'https://api.ionic.io/push/notifications',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwt
                  },
                  data: {
                    "user_ids": recommendedTo,
                    "profile": "dev",
                    "notification": {
                        "message": title + ' recommended',
                        "ios": {
                            "message": title + ' recommended'
                        },
                        "android": {
                            "message": title + ' recommended',
                            "collapse_key": "123"
                        }
                    }
                }
              }).then(function(res) {
                  defer.resolve(res);
              }, function(err) {
                  console.log('error', err);
                  defer.reject(err);
              });

              return defer.promise;
            }
        }
    }(angular));
