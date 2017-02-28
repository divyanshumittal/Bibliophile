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

            bookfeeds.order('createdDate', 'descending').findAll({ organization: _.get(userService.user, 'organization')}).
                watch().subscribe(function(feeds) {
                    vm.feeds = feeds;
                    vm.feeds = _.reject(vm.feeds, { userUUID:  _.get(userService.user, 'id')});
            });
        }
    }(angular));
