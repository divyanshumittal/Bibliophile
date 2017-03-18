    (function(angular) {
        'use strict';
        angular
            .module('app.home.recommended')
            .controller('RecommendedController', RecommendedController);

        // @ngInject
        function RecommendedController($ionicDB, userService, favouriteRecommendations) {
            var vm = this;
            var recommendations = $ionicDB.collection('recommendations');

            vm.optionSelected = 1;
            vm.user = userService.user;
            vm.favouriteRecommendations = favouriteRecommendations;
            vm.updateRecommendation = updateRecommendation;
            userService.setupRecommendationWatcher(getRecommendedBooksCallback);

            function updateRecommendation(bookObj, status) {
                // update recommendation
                if (bookObj.status === 'RECOMMENDED' && status === 'STARTED_READING') {
                    bookObj.isDeprecated = true;
                    recommendations.update(bookObj);
                }
            }

            function getRecommendedBooksCallback(recommendations) {
                var activeRecommendations = _.reject(recommendations, {isDeprecated: true});

                vm.otherRecommendations = _.reject(activeRecommendations, { createdByAdmin: true});
                vm.adminRecommendedBooks = _.filter(activeRecommendations, { createdByAdmin: true});
            }
        }
    }(angular));
