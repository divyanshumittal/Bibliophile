(function(angular) {
    'use strict';

    angular.module('app')
        .factory('loaderService', loaderService);

    // @ngInject
    function loaderService($ionicLoading) {
        var self = this;

        // internals
        self.showLoader = showLoader;
        self.hideLoader = hideLoader;

        function showLoader() {
            $ionicLoading.show({
                template: '<div class="loader">' +
                '<svg class="circular">' +
                '   <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>' +
                '</svg>' +
                '</div>'
            });
        }

        function hideLoader() {
            $ionicLoading.hide();
        }

        return self;
    }
}(angular));
