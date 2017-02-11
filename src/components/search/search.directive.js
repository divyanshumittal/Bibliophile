angular.module('app')

.directive('search', search);

 function search() {
        return {
            templateUrl: 'components/search/search.html',
            controller: 'SearchController',
            controllerAs: 'vm',
            bindtoController: true
        };
    };