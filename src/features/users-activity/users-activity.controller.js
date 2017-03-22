    (function(angular) {
        'use strict';
        angular
            .module('app.home.activity')
            .controller('ActivityController', ActivityController);

        // @ngInject
        function ActivityController(bookfeedService, userService, $ionicDB, $scope, loaderService) {
            var vm = this;
            var bookfeeds = $ionicDB.collection('bookfeeds');
            var activeFeedsCount;
            var newFeeds;

            vm.user = userService.user;
            vm.moredata = false;
            vm.loadMoreData = loadMoreData;
            vm.getFeeds = getFeeds;

            init();

            function init() {
              getFeeds();
            }

            function getFeeds() {
              loaderService.showLoader();
              activeFeedsCount = 5;
              bookfeeds.findAll({ organization: _.get(userService.user, 'organization')})
                       .order('createdDate', 'descending')
                       .fetch().subscribe(function(feeds) {
                          newFeeds = _.reject(feeds, { userUUID:  _.get(userService.user, 'id')});
                          vm.activeFeeds = newFeeds.slice(0, activeFeedsCount);
                          loaderService.hideLoader();
                          $scope.$broadcast('scroll.refreshComplete');
              });
            }

            function loadMoreData() {
              if (vm.activeFeeds) {
                vm.activeFeeds = vm.activeFeeds.concat(newFeeds.slice(activeFeedsCount, activeFeedsCount + 5));
                activeFeedsCount += 5;
                if (vm.activeFeeds.length === newFeeds.length) {
                    vm.moredata = true;
                }
              }

              $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        }
    }(angular));
