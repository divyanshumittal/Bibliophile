(function(angular) {
    'use strict';
    angular
        .module('app.home.recommended', [])
        .config(recommendedConfig);

    // @ngInject
    function recommendedConfig($stateProvider) {
        $stateProvider
            .state('app.home.recommended', {
                url: '/recommended',
                views: {
                    'homeView': {
                        templateUrl: 'features/recommended/recommended.html',
                        controller: 'RecommendedController as vm'
                    }
                },
                resolve: {
                    favouriteRecommendations: function(userService, goodReadsService) {
                        return goodReadsService.getBooks(_.get(userService, ['user', 'favorites', '0']), true)
                                  .then(function(result) {
                                      return result;
                                  });
                        }
                },
                data: {
                    authenticate: false
                }
            });
    }
}(angular));
