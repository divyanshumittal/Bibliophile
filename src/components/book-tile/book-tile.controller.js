angular.module('app')

.controller('BookTileController', BookTileController);

 function BookTileController($ionicPopup, bookfeedService, userService) {
 	var vm = this;     

 	vm.updateStatus = updateStatus;

 	function updateStatus(status) {
 		var statusStr = '';

 		if (status === 'READ') {
 			statusStr = ' moved to Read';
 		} else if (status === 'QUEUE') {
 			statusStr = ' added to Queue';
 		} else if (status === 'STARTED_READING') {
 			statusStr = ' moved to Currently reading list';
 		} else if(status === 'RECOMMENDED') {
 			statusStr = ' recommended';
 		}

 		var alertPopup = $ionicPopup.alert({
		     title: vm.book.title + statusStr
		});

	    alertPopup.then(function(res) {
		      // create bookfeed object
		    var bookfeed =  {
				authorName: vm.book.authorName,
				bookPoints: vm.book.bookPoints,
				imageUrl: vm.book.imageUrl,
				name: _.get(userService, 'name'),
				status: status,
				title: vm.book.title,
				userName: _.get(userService, 'username'),
				userUUID: _.get(userService, 'id')
			};
			
			bookfeedService.createBookfeed(bookfeed).then(function() {
				if (vm.callback) {
					vm.callback();
				}
			});

		});
 	}  
 };