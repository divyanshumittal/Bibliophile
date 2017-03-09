    (function(angular) {
        'use strict';
        angular
            .module('app.userProfile')
            .controller('UserProfileController', UserProfileController);

        // @ngInject
        function UserProfileController($ionicHistory, userService, $ionicDB, $cordovaCamera, $ionicActionSheet) {
            var vm = this;
            var bookfeeds = $ionicDB.collection('bookfeeds');
            var users = $ionicDB.collection('customUsers');

            vm.rating = {
                rate: 0,
                max: 5
            };

            vm.user = userService.user;
            vm.userCopy = angular.copy(vm.user);
            vm.notificationTime = vm.user.notificationTime || 10;
            vm.genres = angular.copy(userService.allGenres);
            vm.genresSelected = genresSelected;
            vm.goBack = goBack;
            vm.openActionSheet = openActionSheet;
            vm.bookCompleted = bookCompleted;

            init();

            function init() {
                bookfeeds.findAll({
                    userUUID: _.get(userService.user, 'id'),
                    status: 'STARTED_READING',
                    isDeprecated: false
                })
                .order('createdDate', 'descending')
                .watch().subscribe(function(books) {
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
              if (vm.userCopy.imageUrl !== vm.user.imageUrl) {
                bookfeeds.findAll({
                    userUUID: _.get(userService.user, 'id')
                }).fetch().subscribe(function(books) {
                    _.forEach(books, function(book) {
                      book.userImgUrl = vm.user.imageUrl;
                      bookfeeds.update(book);
                    });
                });
              }

              if (!_.isEqual(vm.userCopy, vm.user)) {
                users.update(vm.user);
              }

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

            function openActionSheet() {
              // Show the action sheet
             var sheet = $ionicActionSheet.show({
               buttons: [
                 { text: 'Take Photo' },
                 { text: 'Choose Photo' }
               ],
               titleText: '<b>Change profile pic</b>',
               cancelText: 'Cancel',
               cancel: function() {
                    // add cancel code..
                  },
               buttonClicked: function(index) {
                 if (index === 0) {
                   takePhoto(true)
                 } else {
                   takePhoto(false);
                 }

                 return true;
               }
             });
            }

            function takePhoto(take) {
              var options = {
                  quality: 75,
                  destinationType: Camera.DestinationType.DATA_URL,
                  allowEdit: true,
                  encodingType: Camera.EncodingType.JPEG,
                  targetWidth: 300,
                  targetHeight: 300,
                  popoverOptions: CameraPopoverOptions,
                  saveToPhotoAlbum: false
              };

              options.sourceType = take ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY;

              $cordovaCamera.getPicture(options).then(function (imageData) {
                  vm.user.imageUrl= "data:image/jpeg;base64," + imageData;
              }, function (err) {
                  // An error occured. Show a message to the user
              });
            }

            function bookCompleted(bookObj) {
              vm.user.score += bookObj.bookPoints;
            }
        }

    }(angular));
