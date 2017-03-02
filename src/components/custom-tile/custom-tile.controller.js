angular.module('app')

.controller('CustomTileController', CustomTileController);

 function CustomTileController($cordovaLocalNotification, $ionicPopup, userService, $window, $timeout) {
 	var vm = this;

 	vm.tapped = false;
 	vm.addReminder = addReminder;

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
                at         : new Date(new Date().getTime() + userService.notificationTime*1000)
            });

            $timeout(function() {
            	vm.tapped = false;
            }, userService.notificationTime*1000);
 		}

	    vm.tapped = !vm.tapped;
	    $ionicPopup.alert({
		    title: popTitle,
		    template: vm.bookFeed.title
		});
	    
 	}
 }