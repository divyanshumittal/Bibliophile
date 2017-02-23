angular.module('app')

.controller('CustomTileController', CustomTileController);

 function CustomTileController($cordovaLocalNotification) {
 	var vm = this;       

 	vm.addReminder = addReminder;

 	function addReminder() {
      
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Time to Read',
        text: vm.bookFeed.title,
        at: new Date(new Date().getTime() + 10*1000)
      }).then(function (result) {
      	console.log('yo');
      });
 	}
 }