(function(angular) {
    'use strict';
    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    // @ngInject
    function LoginController($ionicAuth, $state, $ionicPush, userService) {
        var vm = this;
       
        vm.login = login;

        init();

        function init() {
            $ionicPush.unregister();
        }

        function login() {
            var details = {'email': vm.username, 'password': vm.password};
            
            if (vm.username && vm.password) {
                $ionicAuth.signup(details)
                 .then(loginUser, loginUser);
            } else {
                vm.invalidLogin = true;
            }
        }

        function loginUser() {
            var details = {'email': vm.username, 'password': vm.password};

            $ionicAuth.login('basic', details).then(function() {
                userService.login(vm.username, vm.password).then(function(result) {
                    if (_.get(result, 'data')) {
                        userService.user = result.data;
                        $state.go('app.home.activity', {registerForPush : true});
                    } else {
                        vm.invalidLogin = true;
                    }
                        
                    }, function() {
                    vm.invalidLogin = true;
                    console.log('login failed');
                });
            });
        }
    }
})(angular);
