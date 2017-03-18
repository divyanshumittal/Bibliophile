    (function(angular) {
        'use strict';
        angular
            .module('app.readingList')
            .controller('ReadingListController', ReadingListController);

        // @ngInject
        function ReadingListController(userService, $ionicDB, bookfeedService) {
            var vm = this;
            var bookfeeds = $ionicDB.collection('bookfeeds');
            var users = $ionicDB.collection('customUsers');

            vm.rating = {
                max: 5
            };
            vm.user = userService.user;
            vm.getBooks = getBooks;
            vm.bookCompleted = bookCompleted;

            init();

            function init() {
                if (!vm.status) {
                     vm.status = 'QUEUE';
                     getBooks(vm.status);
                }
            }

            function getBooks(status) {
                vm.status = status;
                bookfeeds.findAll({
                    userUUID: _.get(userService.user, 'id'),
                    status: vm.status,
                    isDeprecated: false
                }).order('createdDate', 'descending')
                  .watch().subscribe(function(books) {
                    vm.books = books;
                });
            }

            function bookCompleted(bookObj, status) {
              if (status === 'READ') {
                  vm.user.score += bookObj.bookPoints;
                  users.update(vm.user);
              }
            }
        }
    }(angular));
