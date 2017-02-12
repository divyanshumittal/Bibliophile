    (function(angular) {
        'use strict';
        angular
            .module('app.home.activity')
            .controller('ActivityController', ActivityController);

        // @ngInject
        function ActivityController() {
            var vm = this;  

            vm.userArray = [{
                userName: 'Dave',
                userImg: '../resources/img/user_icon.png',
                bookName: 'Red Dog',
                authorName: 'XYZ',
                bookImg: '../resources/img/red_Dog_book_cover.jpg',
                points: 200
            }];
        }
    }(angular));
