angular.module('app')

.directive('customTile', customTile);

 function customTile() {
        return {
            templateUrl: 'components/custom-tile/custom-tile.html',
            controller: 'CustomTileController',
            controllerAs: 'vm',
            scope: true,
            bindToController: {
            	bookFeed: '='
            }
        };
    };