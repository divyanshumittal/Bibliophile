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

            vm.getBooks = getBooks;

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
                    }).watch().subscribe(function(books) {
                        vm.books = books;
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
        }
    }(angular));
