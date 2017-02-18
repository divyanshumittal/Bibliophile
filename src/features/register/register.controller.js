    (function(angular) {
        'use strict';
        angular
            .module('app.register')
            .controller('RegisterController', RegisterController);

        // @ngInject
        function RegisterController(userService, $state, $ionicPopup) {
            var vm = this;

            vm.register = register;
            vm.validatePasswords = validatePasswords;

            function validatePasswords(form) {
                if (form.$valid) {
                    if (vm.password === vm.confirmPassword) {
                        vm.steptwo = true;
                    } else {
                        vm.wrongPasswords = true;
                    }
                }
            }

            function register(form) {
                if (form.$valid) {
                    var user = {  
                       emailId: vm.email,
                       favorites:[  
                          "business",
                          "economics",
                          "politics"
                       ],
                       name: vm.name,
                       organization: vm.company,
                       password: vm.password,
                       username: vm.username
                    }
                    userService.register(user).then(function() {
                        var alertPopup = $ionicPopup.alert({
                             title: 'Registration successful'
                        });

                        alertPopup.then(function(res) {
                            $state.go('app.login');
                        });
                    });
                }
            }
        }
        
    }(angular));
