(function(angular) {
    'use strict';
    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    // @ngInject
    function LoginController($state, $ionicAuth, $ionicPush, $ionicGoogleAuth, userService, $ionicUser,
                                loaderService) 
    {
        var vm = this;

        vm.genres = angular.copy(userService.allGenres);
        vm.login = login;
        vm.googleSignIn = googleSignIn;
        vm.signupWithBackend = signupWithBackend;

        init();

        function init() {
            $ionicPush.unregister();
        }

        function googleSignIn() {
            loaderService.showLoader();
            $ionicGoogleAuth.login().then(function(result) {
                vm.username = $ionicUser.social.google.data.username;
                vm.signUpWithGoogle = true;
            },function(err) {
                console.log('error', err);
            }).finally(function() {
                loaderService.hideLoader();
            });
        }

        //signup user with our backend and then login even if signup fails
        //if signup fails means user has already signed up
        function signupWithBackend(googleForm) {
            if (googleForm.$valid) {
                var user = {
                 emailId: $ionicUser.social.google.data.email,
                 name: $ionicUser.social.google.data.full_name,
                 organization: vm.company,
                 password: vm.password,
                 username: $ionicUser.social.google.data.username,
                 favorites: [],
                 imageUrl: $ionicUser.social.google.data.profile_picture
                };

                vm.email = user.emailId;
               
                backendLogin();              //temp
                userService.user = user;     //temp
                // userService.register(user).then(backendLogin, backendLogin);
            }
        }

        function login() {
            var details = {'email': vm.email, 'password': vm.password};
            
            //signup user with ionicAuth and then login even if signup fails
            //if signup fails means user has already signed up
            if (vm.email && vm.password) {
                loaderService.showLoader();
                $ionicAuth.signup(details)
                 .then(ionicLogin, ionicLogin);
            } else {
                vm.invalidLogin = true;
            }
        }

        function ionicLogin() {
            var details = {'email': vm.email, 'password': vm.password};

            $ionicAuth.login('basic', details).then(backendLogin);
        }

        function backendLogin() {
            // userService.login(vm.email, vm.password).then(function(result) {
            //     if (_.get(result, 'data')) {
            //         userService.user = result.data;
                    $state.go('app.home.activity', {registerForPush : true});
            //     } else {
            //         vm.invalidLogin = true;
            //     }
                    
            //     }, function() {
            //         vm.invalidLogin = true;
            //         console.log('login failed');
            // }).finally(function() {
                loaderService.hideLoader();
            // });
        }
    }
})(angular);
