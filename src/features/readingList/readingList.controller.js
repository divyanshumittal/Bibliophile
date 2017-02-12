    (function(angular) {
        'use strict';
        angular
            .module('app.readingList')
            .controller('ReadingListController', ReadingListController);

        // @ngInject
        function ReadingListController() {
            var vm = this;  

            vm.status = 'CURRENTLY READING';
            vm.books = [{
                bookName: 'Red Dog',
                authorName: 'XYZ',
                bookImg: '../resources/img/red_Dog_book_cover.jpg',
                points: 200
            }];
            vm.getBooks = getBooks;

            function getBooks(status) {
                vm.status = status;
                //set vm.books
            }
        }
    }(angular));
