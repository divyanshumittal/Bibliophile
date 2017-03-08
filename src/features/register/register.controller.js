    (function(angular) {
        'use strict';
        angular
            .module('app.register')
            .controller('RegisterController', RegisterController);

        // @ngInject
        function RegisterController($state, $cordovaCamera, userService) {
            var vm = this;

            vm.genres = angular.copy(userService.allGenres);
            vm.stepOne = true;
            vm.wrongPasswords = false;
            vm.imgURI = 'resources/img/user_icon.png';

            vm.register = register;
            vm.validatePasswords = validatePasswords;
            vm.takePhoto = takePhoto;
            vm.nextStep = nextStep;
            vm.goTo = goTo;

            function goTo(step) {
              if (step === 1) {
                vm.stepOne = true;
                vm.stepTwo = false;
                vm.stepThree = false;
              } else if ((step === 2) && vm.password && vm.name && vm.username && vm.confirmPassword) {
                vm.stepOne = false;
                vm.stepTwo = true;
                vm.stepThree = false;
              } else if ((step === 3) && vm.password && vm.email
                      && vm.name && vm.username && vm.company && vm.confirmPassword) {
                vm.stepOne = false;
                vm.stepTwo = false;
                vm.stepThree = true;
              }
            }

            function validatePasswords(form) {
                if (form.$valid) {
                    if (vm.password === vm.confirmPassword) {
                        vm.stepOne = false;
                        vm.stepTwo = true;
                    } else {
                        vm.wrongPasswords = true;
                    }
                }
            }

            function nextStep(form) {
              if (form.$valid) {
                vm.stepTwo = false;
                vm.stepThree = true;
              }
            }

            function register() {
              var genres;

              if (vm.selectedGenres) {
                genres = _.map(vm.selectedGenres.split(';'), function(selectedId) {
                    return _.find(vm.genres, {id: parseInt(selectedId)}).text;
                });
              }

              var user = {
                 email: vm.email,
                 name: vm.name,
                 organization: vm.company,
                 password: vm.password,
                 username: vm.username,
                 favorites: genres,
                 imageUrl: vm.imgURI,
                 title: vm.title,
                 score: 0,
                 createdDate: new Date(),
                 notificationTime: 10,
                 isAdmin: false
              };
              var details = {
                email: vm.email,
                password: vm.password
              };

              userService.signup(user, details, false, errorCallback);
            }

            function errorCallback() {
              vm.stepTwo = true;
              vm.stepThree = false;
              vm.duplicateEmail = true;
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
                  vm.imgURI = "data:image/jpeg;base64," + imageData;
              }, function (err) {
                  // An error occured. Show a message to the user
              });
            }
        }

    }(angular));
