    (function(angular) {
        'use strict';
        angular
            .module('app')
            .service('userService', userService);

        // @ngInject
        function userService($ionicAuth, $ionicPopup, $ionicDB, $state, $ionicGoogleAuth) {
            var self = this;  
            var users = $ionicDB.collection('customUsers');

            $ionicDB.connect();

            self.allGenres = [
              {id: 1, text: 'Business', checked: false, icon: null}, 
              {id: 2, text: 'Science', checked: false, icon: null}, 
              {id : 3, text: 'Mystery', checked: false, icon: null},
              {id : 4, text: 'History', checked: false, icon: null},
              {id : 5, text: 'Economics', checked: false, icon: null},
              {id : 6, text: 'Poetry', checked: false, icon: null}];
              
            self.notificationTime = 10;
            self.signup = signup;
            self.login = login;
            self.getAllUsers = getAllUsers;

            function signup(user, details, googleSignUp) {
              if (googleSignUp) {
                saveCustomUser(user, googleSignUp);
              } else {
                $ionicAuth.signup(details)
                 .then(function() {
                   saveCustomUser(user, googleSignUp);
                 });
              }
            }

            function saveCustomUser(user, googleSignUp) {
              var alertPopup = $ionicPopup.alert({
                     title: 'Registration successful'
              });

              alertPopup.then(function(res) {
                  if (googleSignUp) {
                    $ionicGoogleAuth.logout();
                  }
                  $state.go('app.login');
              });

              users.store(user);
            }

            function login(details) {
                users.find({email: details.email}).fetch().subscribe(function(user) {
                    self.user = user;
                    getAllUsers();
                    $state.go('app.home.activity', { registerForPush : true });
                });
            }

            function getAllUsers() {
              users.order("score").findAll({ organization: _.get(self.user, 'organization')}).fetch().subscribe(function(users) {
                  self.users = users;
              });
            }
        }
    }(angular));
