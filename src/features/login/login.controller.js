    (function(angular) {
        'use strict';
        angular
            .module('app.login')
            .controller('LoginController', LoginController);

        // @ngInject
        function LoginController(AuthService, $state, $ionicPush, userService) {
            var vm = this;
           
            vm.login = login;
            vm.validateLogin = validateLogin;
            vm.registerForPush = registerForPush;

            // should get called when ap loads for the first time
            function registerForPush() {
                $ionicPush.register().then(function(t) {
                    return $ionicPush.saveToken(t);
                }).then(function(t) {
                    console.log('Token saved:', t.token);
                });
            }

            function login() {
                $state.go('app.home.activity');
                // userService.login(vm.username, vm.password).then(function(result) {
                //     if (result.data) {
                //         userService.user = result.data;
                //         $state.go('app.home.activity');
                //     } else {
                //         vm.invalidLogin = true;
                //         console.log('login failed');
                //     }
                    
                // }, function() {
                    
                // });
                
            }
            
            function validateLogin() {
                AuthService.authenticate(vm.email, vm.password)
                    .then(function(resp) {
                        _setUpPush();
                    }, function() {

                    });
            }
        }
    })(angular);
