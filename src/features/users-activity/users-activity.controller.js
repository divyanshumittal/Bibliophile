    (function(angular) {
        'use strict';
        angular
            .module('app.home.activity')
            .controller('ActivityController', ActivityController);

        // @ngInject
        function ActivityController(bookfeedService, userService, $ionicDB) {
            var vm = this;
            var bookfeeds = $ionicDB.collection('bookfeeds');

            vm.user = userService.user;

            bookfeeds.findAll({ organization: _.get(userService.user, 'organization')})
                     .order('createdDate', 'descending')
                     .watch().subscribe(function(feeds) {
                        vm.feeds = feeds;
                        vm.feeds = _.reject(vm.feeds, { userUUID:  _.get(userService.user, 'id')});
            });
        }
    }(angular));
