    (function(angular) {
        'use strict';
        angular
            .module('app.login')
            .controller('LoginController', LoginController);

        // @ngInject
        function LoginController($window, AuthService, $state) {
            var vm = this;
           
            vm.login = login;
            vm.validateLogin = validateLogin;

            function login() {
                $state.go('app.activity');
            }
            
            function validateLogin() {
                AuthService.authenticate(vm.email, vm.password)
                    .then(function(resp) {
                        _setUpPush();
                    }, function() {

                    });
            }

            function _setUpPush() {
                $window.Ionic.Auth.login('basic', {}, {
                    'email': loginVm.email,
                    'password': loginVm.email
                }).then(function (user) {
                    AuthService.registerForPush(user, true);
                }, function() {
                    // or register and then login
                    $window.Ionic.Auth.signup({
                        'email': loginVm.email,
                        'password': loginVm.email
                    }).then(function (res) {
                        $window.Ionic.Auth.login('basic', {}, {
                            'email': loginVm.email,
                            'password': loginVm.email
                        }).then(function (user) {
                            AuthService.registerForPush(user, true);
                        }, function() {
                            
                        });
                    }, function() {
                        
                    });
                });
            }
        }
    }(angular));
