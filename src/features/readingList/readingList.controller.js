    (function(angular) {
        'use strict';
        angular
            .module('app.readingList')
            .controller('ReadingListController', ReadingListController);

        // @ngInject
        function ReadingListController(bookfeedService, userService) {
            var vm = this;  

            vm.status = 'RECOMMENDED';

            // vm.books = [{
            //     title: 'Red Dog',
            //     authorName: 'XYZ',
            //     imageUrl: 'resources/img/red_Dog_book_cover.jpg',
            //     bookPoints: 200,
            //     status: 'RECOMMENDED'
            // }];
            vm.getBooks = getBooks;

            function getBooks(status) {
                vm.status = status || vm.status;
                bookfeedService.getBooks(_.get(userService.user, 'id'), status).then(function(result) {
                    vm.books = _.get(result, 'content');
                });
            }
        }
    }(angular));
