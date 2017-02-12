angular.module('app')

.directive('bookTile', bookTile);

 function bookTile() {
        return {
            templateUrl: 'components/book-tile/book-tile.html',
            controller: 'BookTileController',
            controllerAs: 'vm',
            scope: true,
            bindToController: {
            	book: '='
            }
        };
    };