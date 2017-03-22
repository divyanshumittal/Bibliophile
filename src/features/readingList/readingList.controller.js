    (function(angular) {
        'use strict';
        angular
            .module('app.readingList')
            .controller('ReadingListController', ReadingListController);

        // @ngInject
        function ReadingListController(userService, $ionicDB, bookfeedService, loaderService) {
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
                loaderService.showLoader();
                vm.status = status;
                bookfeeds.findAll({
                    userUUID: _.get(userService.user, 'id'),
                    status: vm.status,
                    isDeprecated: false
                }).order('createdDate', 'descending')
                  .fetch().subscribe(function(books) {
                    vm.books = books;
                    loaderService.hideLoader();
                });
            }

            function bookCompleted(bookObj, status) {
              if (status === 'READ') {
                  vm.user.score += bookObj.bookPoints;
                  users.update(vm.user);
              }

              vm.books.splice(vm.books.indexOf(bookObj), 1);
            }
        }
    }(angular));
