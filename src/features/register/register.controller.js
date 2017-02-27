    (function(angular) {
        'use strict';
        angular
            .module('app.register')
            .controller('RegisterController', RegisterController);

        // @ngInject
        function RegisterController(userService, $state, $ionicPopup, $cordovaCamera) {
            var vm = this;

            vm.genres = angular.copy(userService.allGenres);
            vm.stepOne = true;
            vm.wrongPasswords = false;
            vm.imgURI = 'resources/img/user_icon.png';

            vm.register = register;
            vm.validatePasswords = validatePasswords;
            vm.takePhoto = takePhoto;
            vm.choosePhoto = choosePhoto;
            vm.nextStep = nextStep;

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
                 emailId: vm.email,
                 name: vm.name,
                 organization: vm.company,
                 password: vm.password,
                 username: vm.username,
                 favorites: genres,
                 imageUrl: vm.imgURI
              };
              // userService.register(user).then(function() {
                  var alertPopup = $ionicPopup.alert({
                       title: 'Registration successful'
                  });

                  alertPopup.then(function(res) {
                      $state.go('app.login');
                  });
              // });
            }

            function takePhoto() {
              var options = {
                  quality: 75,
                  destinationType: Camera.DestinationType.DATA_URL,
                  sourceType: Camera.PictureSourceType.CAMERA,
                  allowEdit: true,
                  encodingType: Camera.EncodingType.JPEG,
                  targetWidth: 300,
                  targetHeight: 300,
                  popoverOptions: CameraPopoverOptions,
                  saveToPhotoAlbum: false
              };
 
              $cordovaCamera.getPicture(options).then(function (imageData) {
                  vm.imgURI = "data:image/jpeg;base64," + imageData;
              }, function (err) {
                  // An error occured. Show a message to the user
              });
            }

            function choosePhoto() {
              var options = {
                  quality: 75,
                  destinationType: Camera.DestinationType.DATA_URL,
                  sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                  allowEdit: true,
                  encodingType: Camera.EncodingType.JPEG,
                  targetWidth: 300,
                  targetHeight: 300,
                  popoverOptions: CameraPopoverOptions,
                  saveToPhotoAlbum: false
              };
 
              $cordovaCamera.getPicture(options).then(function (imageData) {
                  vm.imgURI = "data:image/jpeg;base64," + imageData;
              }, function (err) {
                  // An error occured. Show a message to the user
              });
            }
        }
        
    }(angular));
