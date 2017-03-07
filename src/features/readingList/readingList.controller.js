    (function(angular) {
        'use strict';
        angular
            .module('app.readingList')
            .controller('ReadingListController', ReadingListController);

        // @ngInject
        function ReadingListController(userService, $ionicDB, bookfeedService) {
            var vm = this;
            var bookfeeds = $ionicDB.collection('bookfeeds');
            var recommendations = $ionicDB.collection('recommendations');

            vm.user = userService.user;
            vm.getBooks = getBooks;
            vm.updateRecommendation = updateRecommendation;

            init();

            function init() {
                if (!vm.status) {
                     vm.status = 'RECOMMENDED';
                     getBooks(vm.status);
                }
                userService.setupRecommendationWatcher(getRecommendedBooksCallback);
            }

            function getBooks(status) {
                vm.status = status;

                //recommendation are being set by getRecommendedBooksCallback()
                if (status !== 'RECOMMENDED') {
                    bookfeeds.findAll({
                        userUUID: _.get(userService.user, 'id'),
                        status: status,
                        isDeprecated: false
                    }).order('createdDate', 'descending')
                      .watch().subscribe(function(books) {
                        vm.books = books;
                    });
                }
            }

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
