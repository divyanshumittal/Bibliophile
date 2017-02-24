    (function(angular) {
        'use strict';
        angular
            .module('app.userProfile')
            .controller('UserProfileController', UserProfileController);

        // @ngInject
        function UserProfileController($ionicHistory, userService) {
            var vm = this;  

            vm.notificationTime = userService.notificationTime;
            vm.genres = angular.copy(userService.allGenres);
            vm.genresSelected = genresSelected;
            vm.goBack = goBack;

            vm.user = {
                name: 'John Doe',
                points: 230,
                img: 'resources/img/user_icon.png',
                booksRead: 3,
                title: 'Recruiter',
                org: 'Egen',
                categories: ['Mystery', 'History']
            };

            vm.currentBooks = [{
                imageUrl: 'resources/img/red_Dog_book_cover.jpg',
                title: 'Red Dog',
                authorName: 'XYZ',
                bookImg: 'resources/img/red_Dog_book_cover.jpg',
                bookPoints: 200,
                status: 'STARTED_READING'
            }];

            _.map(vm.genres, function(genre) {
                if (vm.user.categories.indexOf(genre.text) > -1) {
                    genre.checked = true;
                }
            });

            function goBack() {
                $ionicHistory.goBack();
            }

            function genresSelected(value) {
                vm.user.categories = _.map(value.split(';'), function(selectedId) {
                    return _.find(vm.genres, {id: parseInt(selectedId)}).text;
                });
            }
        }

    }(angular));
