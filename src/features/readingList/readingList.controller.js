    (function(angular) {
        'use strict';
        angular
            .module('app.readingList')
            .controller('ReadingListController', ReadingListController);

        // @ngInject
        function ReadingListController() {
            var vm = this;  

            vm.status = 'current';
            vm.getBooks = getBooks;

            function getBooks(status) {
                vm.status = status;
                console.log(vm.status);
            }
        }
    }(angular));
