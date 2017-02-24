    (function(angular) {
        'use strict';
        angular
            .module('app')
            .service('userService', userService);

        // @ngInject
        function userService($http, $q) {
            var self = this;  

            self.allGenres = [
              {id: 1, text: 'Business', checked: false, icon: null}, 
              {id: 2, text: 'Science', checked: false, icon: null}, 
              {id : 3, text: 'Mystery', checked: false, icon: null},
              {id : 4, text: 'History', checked: false, icon: null},
              {id : 5, text: 'Economics', checked: false, icon: null},
              {id : 6, text: 'Poetry', checked: false, icon: null}];
              
            self.notificationTime = 10;
            self.login = login;
            self.register = register;
            self.getAllUsers = getAllUsers;

            function login(username, password) {
                var defer = $q.defer();

                $http({
                    method: 'GET',
                    url: '/api/v1/user/oauth',
                    params: {
                        username: username,
                        password: password
                    }
                }).then(function(res) {
                    defer.resolve(res);
                }, function(err) {
                    console.log('error', err);
                    defer.reject(err);
                });

                return defer.promise;
            }

            function register(user) {
            	var defer = $q.defer();

                $http({
                    method: 'POST',
                    url: '/api/v1/user',
                    params: {
                        username: user.username,
                        password: user.password
                    },
                    data: user
                }).then(function(res) {
                    defer.resolve(res);
                }, function(err) {
                    console.log('error', err);
                    defer.reject(err);
                });

                return defer.promise;
            }

            function getAllUsers(organization) {
                var defer = $q.defer();

                $http({
                    method: 'GET',
                    url: '/api/v1/user',
                    params: {
                        organization: organization,
                        sortBy: 'bookPoints'
                    }
                }).then(function(res) {
                    defer.resolve(res);
                }, function(err) {
                    console.log('error', err);
                    defer.reject(err);
                });

                return defer.promise;
            }
        }
    }(angular));
