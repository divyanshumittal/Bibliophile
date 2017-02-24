angular.module('app')

.controller('CustomTileController', CustomTileController);

 function CustomTileController($cordovaLocalNotification, $ionicPopup, userService) {
 	var vm = this;       
 	var id = Math.random();

 	vm.tapped = false;
 	vm.addReminder = addReminder;

 	function addReminder() {
 		var popTitle = 'Reminder scheduled';

 		if (vm.tapped) {
 			popTitle = 'Reminder cancelled';
 			$cordovaLocalNotification.cancel(id).then(function (result) {
		        // ...
		    });
 		} else {
 			$cordovaLocalNotification.schedule({
		        id: id,
		        title: 'Time to Read',
		        text: vm.bookFeed.title,
		        at: new Date(new Date().getTime() + userService.notificationTime*1000)
		    }).then(function (result) {
		      	console.log('yo');
		    });
 		}

	    vm.tapped = !vm.tapped;
	    $ionicPopup.alert({
		    title: popTitle,
		    template: vm.bookFeed.title
		});
	    
 	}
 }