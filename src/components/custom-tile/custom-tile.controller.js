angular.module('app')

.controller('CustomTileController', CustomTileController);

 function CustomTileController($cordovaLocalNotification, $ionicPopup, userService, $window, $timeout,
                                $ionicModal, $scope, $ionicDB) {
 	var vm = this;

  var bookfeeds = $ionicDB.collection('bookfeeds');

  vm.myBook = vm.bookFeed.userUUID === userService.user.id;
 	vm.tapped = false;
 	vm.addReminder = addReminder;
  vm.likeDislikeFeed = likeDislikeFeed;
  vm.openModal = openModal;
  vm.hideModal = hideModal;
  vm.liked = _.find(vm.bookFeed.likedBy, { id: userService.user.id}) ? true : false;
  vm.likedByUsers = vm.bookFeed.likedBy;
  vm.createdDate = moment(vm.bookFeed.createdDate).format('MM-DD-YYYY HH:mm:ss a');

  $ionicModal.fromTemplateUrl('components/custom-tile/liked-by-list.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    vm.modal = modal;
  });

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    vm.modal.remove();
  });

 	function addReminder() {
 		var popTitle = 'Reminder scheduled';

 		if (vm.tapped) {
 			popTitle = 'Reminder cancelled';
 			$window.cordova.plugins.notification.local.cancel(1, function() {});
 		} else {
 			$window.cordova.plugins.notification.local.schedule({
                id         : 1,
                title      : 'Time to Read',
                text       : vm.bookFeed.title,
                sound      : null,
                autoClear  : false,
                at         : new Date(new Date().getTime() + userService.user.notificationTime*1000)
            });

            $timeout(function() {
            	vm.tapped = false;
            }, userService.user.notificationTime*1000);
 		}

	    vm.tapped = !vm.tapped;
	    $ionicPopup.alert({
		    title: popTitle,
		    template: vm.bookFeed.title
		});

 	}

  function likeDislikeFeed() {
    vm.liked = !vm.liked;

    if (vm.liked) {
      vm.bookFeed.likedBy.push({
        id: userService.user.id,
        username: userService.user.username,
        imageUrl: userService.user.imageUrl
      });
    } else {
      _.remove(vm.bookFeed.likedBy, {
          id: userService.user.id
      });
    }
    bookfeeds.store(vm.bookFeed);
  }

  function openModal() {
    vm.modal.show();
  }

  function hideModal() {
    vm.modal.hide();
  }
 }
