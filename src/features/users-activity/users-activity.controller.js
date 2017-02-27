    (function(angular) {
        'use strict';
        angular
            .module('app.home.activity')
            .controller('ActivityController', ActivityController);

        // @ngInject
        function ActivityController(bookfeedService, userService) {
            var vm = this;

            vm.user = userService.user;

            bookfeedService.getAllFeeds(_.get(vm.user, 'username')).then(function(res) {
                vm.userFeed = _.get(res, 'data');
                _.forEach(vm.userFeed, function(user) {
                    user.userImgUrl = 'resources/img/user_icon.png';
                });
            });


            vm.userFeed = [{
                name: 'Dave',
                imageUrl: 'resources/img/user_icon.png',
                title: 'Red Dog',
                authorName: 'XYZ',
                bookImg: 'resources/img/red_Dog_book_cover.jpg',
                bookPoints: 200,
                status: 'STARTED_READING'
            }];
        }
    }(angular));
