angular.module('app')

.controller('SearchController', SearchController);

 function SearchController(goodReadsService, $state) {
 	var vm = this;    

 	vm.getResults = getResults;
    vm.itemSelected = itemSelected;
    vm.itemsRemoved = itemsRemoved;

    function itemsRemoved() {

    }

    function getResults(query) {
        if (query) {
            goodReadsService.getBooks(query).then(function(data) {
                console.log(data);
            }, function(err) {
                console.log('errrrr', err);
            });
        }
        
        return [{
            name: query,
            view: query
        }];
    }

    function itemSelected() {
        console.log('item clicked');
        vm.emptyArray = [];
        $state.go('app.home.bookDetails');
    }   
 };