    (function(angular) {
        'use strict';
        angular
            .module('app.readingList')
            .controller('ReadingListController', ReadingListController);

        // @ngInject
        function ReadingListController(userService, $ionicDB) {
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
            }

            function getBooks(status) {
                vm.status = status; 
                
                if (status === 'RECOMMENDED') {
                    recommendations.findAll({
                        recommendedTo: _.get(userService.user, 'id'),
                        isDeprecated: false
                    }).watch().subscribe(function(recommendations) {
                        vm.books = _.reject(recommendations, { createdByAdmin: true});
                        vm.adminRecommendedBooks = _.filter(recommendations, { createdByAdmin: true});
                    });
                } else {
                    bookfeeds.findAll({
                        userUUID: _.get(userService.user, 'id'),
                        status: status,
                        isDeprecated: false
                    }).watch().subscribe(function(books) {
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
        }
    }(angular));
