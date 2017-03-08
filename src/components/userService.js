    (function(angular) {
        'use strict';
        angular
            .module('app')
            .service('userService', userService);

        // @ngInject
        function userService($ionicAuth, $ionicPopup, $ionicDB, $state, $ionicGoogleAuth, bookfeedService,
                              loaderService, $window) {
            var self = this;
            var users = $ionicDB.collection('customUsers');
            var recommendations = $ionicDB.collection('recommendations');
            var myOldRecommendationsObjs = undefined;

            self.signup = signup;
            self.login = login;
            self.setupRecommendationWatcher = setupRecommendationWatcher;

            init();

            function init() {
              $ionicDB.connect();
              self.allGenres = [
                {id: 1, text: 'Business', checked: false, icon: null},
                {id: 2, text: 'Science', checked: false, icon: null},
                {id : 3, text: 'Mystery', checked: false, icon: null},
                {id : 4, text: 'History', checked: false, icon: null},
                {id : 5, text: 'Economics', checked: false, icon: null},
                {id : 6, text: 'Poetry', checked: false, icon: null},
                {id : 7, text: 'Fantasy', checked: false, icon: null}];
            }

            function signup(user, details, googleSignUp, errorCallback) {
              if (googleSignUp) {
                self.user = user;
                saveCustomUser(user, googleSignUp);
              } else {
                $ionicAuth.signup(details)
                 .then(function() {
                   saveCustomUser(user, googleSignUp);
                 }, function(err) {
                   console.log(err);
                   if (_.get(err, ['details', 0]) === 'conflict_email' && _.isFunction(errorCallback)) {
                     errorCallback();
                   }
                 });
              }
            }

            function saveCustomUser(user, googleSignUp) {
              var alertPopup = $ionicPopup.alert({
                     title: 'Registration successful'
              });

              alertPopup.then(function(res) {
                  if (googleSignUp) {
                    $state.go('app.home.activity', { registerForPush : true, googleSignIn: true });
                  } else {
                    $state.go('app.login');
                  }
              });

              users.store(user);
            }

            function login(details) {
              loaderService.showLoader();
                users.find({email: details.email}).fetch().subscribe(function(user) {
                    self.user = user;
                    users.order("score").findAll({ organization: _.get(self.user, 'organization')}).watch().subscribe(function(users) {
                        self.users = users;
                        $state.go('app.home.activity', { registerForPush : true });
                        loaderService.hideLoader();
                    });
                });
            }

            function setupRecommendationWatcher(callback) {
              setup(callback);

              $window.cordova.plugins.backgroundMode.enable();
              // Called when background mode has been activated
              $window.cordova.plugins.backgroundMode.onactivate = function() {
                  setup(callback);
              }
            }

            function setup(callback) {
              recommendations.findAll({
                  recommendedTo: self.user.id
              }).order('createdDate', 'descending')
                .watch().subscribe(function(newRecommendations) {
                  //findAll filter not workng
                newRecommendations = _.filter(newRecommendations, { recommendedTo: self.user.id });
                if (myOldRecommendationsObjs && (newRecommendations.length !== myOldRecommendationsObjs.length)) {
                  bookfeedService.sendCordovaNotification(newRecommendations[0].title);
                }
                if (_.isFunction(callback)) {
                  callback(newRecommendations);
                }

                myOldRecommendationsObjs = newRecommendations;
              });
            }
        }
    }(angular));
