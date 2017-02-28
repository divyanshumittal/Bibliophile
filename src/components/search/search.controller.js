angular.module('app')

.controller('SearchController', SearchController);

 function SearchController(goodReadsService, userService, $ionicPopover, $scope, $state, $ionicAuth, $ionicGoogleAuth, $ionicUser) {
   	var vm = this;    

    vm.user = userService.user;
   	vm.getResults = getResults;
    vm.itemSelected = itemSelected;
    vm.openSettings = openSettings;
    vm.logout = logout;

    init();

    function init() {
      $ionicPopover.fromTemplateUrl('components/search/logout-pop-over.html', {
        scope: $scope
      }).then(function(popover) {
        vm.popover = popover;
      });

      //Cleanup the popover when we're done with it!
      $scope.$on('$destroy', function() {
        vm.popover.remove();
      });
    }
    
    var queryData = [
          {
            "id": "80abd054-64b1-478f-82f7-de0b8a7678fb",
            "title": "Harry Potter and the Sorcerer's Stone (Harry Potter, #1)",
            "goodReadsId": 3
          },
          {
            "id": "67e50a98-cdf9-4a6d-8f93-b6efb3551f37",
            "title": "Harry Potter and the Prisoner of Azkaban (Harry Potter, #3)",
            "goodReadsId": 5
          },
          {
            "id": "c86d88ac-189a-48d3-8138-f84a21ea3379",
            "title": "Harry Potter and the Chamber of Secrets (Harry Potter, #2)",
            "goodReadsId": 15881
          },
          {
            "id": "5f233173-6469-4fa1-84d8-dcf23f4fb857",
            "title": "Harry Potter and the Deathly Hallows (Harry Potter, #7)",
            "goodReadsId": 136251
          }];

    function getResults(query) {
        if (query) {
            // return goodReadsService.getBooks(query).then(function(res) {
            //     return res.data;
            // }, function(err) {
            //     console.log('errrrr', err);
            // });

            return queryData;
        } else {
          return [];
        }
    }

    function itemSelected(callback) {
        vm.emptyArray = [];
        $state.go('app.bookDetails', {
            id: callback.item.goodReadsId
        });
    }   

    function openSettings(event) {
      vm.popover.show(event);
    }

    function logout() {
      vm.popover.hide();

      if ($ionicUser.social.google) {
        $ionicGoogleAuth.logout();
      } else {
        $ionicAuth.logout();
      }
      
      $state.go('app.login');
    }
 };