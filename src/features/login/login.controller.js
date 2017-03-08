(function(angular) {
    'use strict';
    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    // @ngInject
    function LoginController($ionicAuth, $ionicPush, $ionicGoogleAuth, $ionicUser, loaderService, userService,
                                $ionicDB, $state)
    {
        var vm = this;
        var users = $ionicDB.collection('customUsers');

        vm.genres = angular.copy(userService.allGenres);
        vm.login = login;
        vm.googleSignIn = googleSignIn;
        vm.signup =  signup;

        init();

        function init() {
            $ionicPush.unregister();
        }

        function googleSignIn() {
            loaderService.showLoader();
            $ionicGoogleAuth.login().then(function(result) {
                users.find({email: $ionicUser.social.google.data.email}).fetch().subscribe(function(user) {
                    if (user) {
                        userService.user = user;
                        $state.go('app.home.activity', { registerForPush : true, googleSignIn: true });
                    } else {
                        vm.username = $ionicUser.social.google.data.username;
                        vm.signUpWithGoogle = true;
                    }
                });
            },function(err) {
                // already signed up
                userService.login({email: $ionicUser.social.google.data.email});
            }).finally(function() {
                loaderService.hideLoader();
            });
        }

        function signup(googleForm) {
            if (googleForm.$valid) {
                var genres;

                if (vm.selectedGenres) {
                    genres = _.map(vm.selectedGenres.split(';'), function(selectedId) {
                        return _.find(vm.genres, {id: parseInt(selectedId)}).text;
                    });
                }

                var user = {
                    email: $ionicUser.social.google.data.email,
                    name: $ionicUser.social.google.data.full_name,
                    organization: vm.company,
                    password: vm.password,
                    username: $ionicUser.social.google.data.username,
                    favorites: genres,
                    imageUrl: $ionicUser.social.google.data.profile_picture,
                    title: vm.title,
                    score: 0,
                    createdDate: new Date(),
                    notificationTime: 10,
                    isAdmin: false
                };
                var details = {
                    email: $ionicUser.social.google.data.email,
                    password: vm.password
                };

                userService.signup(user, details, true);
                vm.signUpWithGoogle = false;
            }
        }

        function login() {
            var details = {'email': vm.email, 'password': vm.password};

            if (vm.email && vm.password) {
                loaderService.showLoader();
                $ionicAuth.login('basic', details)
                    .then(function() {
                        userService.login(details);
                    }, function() {
                        vm.invalidLogin = true;
                    })
                    .finally(function() {
                        loaderService.hideLoader();
                    });
            } else {
                vm.invalidLogin = true;
            }
        }
    }
})(angular);
