    (function(angular) {
        'use strict';
        angular
            .module('app.userProfile')
            .controller('UserProfileController', UserProfileController);

        // @ngInject
        function UserProfileController($ionicHistory) {
            var vm = this;  

            vm.user = {
                name: 'John Doe',
                points: 230,
                img: '../resources/img/user_icon.png',
                booksRead: 3,
                title: 'Recruiter',
                org: 'Egen',
                categories: ['Crime', 'Fiction']
            };

            vm.currentBooks = [{
                bookName: 'Red Dog',
                authorName: 'XYZ',
                bookImg: '../resources/img/red_Dog_book_cover.jpg',
                points: 200
            }];

            vm.goBack = goBack;
            vm.removeCategory = removeCategory;

            function goBack() {
                $ionicHistory.goBack();
            }

            function removeCategory(cat) {
                vm.user.categories.splice(vm.user.categories.indexOf(cat) , 1);
                // update user object at backend
            }
        }

    }(angular));
