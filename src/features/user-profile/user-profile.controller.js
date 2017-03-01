    (function(angular) {
        'use strict';
        angular
            .module('app.userProfile')
            .controller('UserProfileController', UserProfileController);

        // @ngInject
        function UserProfileController($ionicHistory, userService, $ionicDB) {
            var vm = this;
            var bookfeeds = $ionicDB.collection('bookfeeds');

            vm.rating = {
                rate: 0,
                max: 5
            };

            vm.user = userService.user;
            vm.notificationTime = userService.notificationTime;
            vm.genres = angular.copy(userService.allGenres);
            vm.genresSelected = genresSelected;
            vm.goBack = goBack;
            vm.ratingsClicked = ratingsClicked;

            init();

            function init() {
                bookfeeds.findAll({
                    userUUID: _.get(userService.user, 'id'),
                    status: 'STARTED_READING',
                    isDeprecated: false
                }).watch().subscribe(function(books) {
                    vm.books = books;
                });

                _.map(vm.genres, function(genre) {
                    if (_.get(vm.user, 'favorites', []).indexOf(genre.text) > -1) {
                        genre.checked = true;
                    }
                });

                calcBooksRead();
            }

            function goBack() {
                $ionicHistory.goBack();
            }

            function genresSelected(value) {
                vm.user.favorites = _.map(value.split(';'), function(selectedId) {
                    return _.find(vm.genres, {id: parseInt(selectedId)}).text;
                });
            }

            function calcBooksRead() {
                bookfeeds.findAll({
                    userUUID: _.get(userService.user, 'id'),
                    status: 'READ'
                }).watch().subscribe(function(books) {
                    vm.booksRead = _.size(books);
                });
            }

            function ratingsClicked(bookObj) {
                bookObj.ratings = vm.rating.rate;
            }
        }

    }(angular));
