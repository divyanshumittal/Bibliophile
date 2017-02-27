angular.module('app')

.controller('BookTileController', BookTileController);

 function BookTileController($ionicPopup, bookfeedService, userService, $timeout) {
 	var vm = this;     

 	vm.users = userService.getAllUsers();

 	vm.updateStatus = updateStatus;
 	vm.bookRecommended = bookRecommended;

 	function bookRecommended() {
		$timeout(function() {
 			updateStatus('RECOMMENDED');
 		}, 500);
 	}

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
				name: _.get(userService, 'user', 'name'),
				status: status,
				title: vm.book.title,
				userName: _.get(userService, 'user', 'username'),
				userUUID: _.get(userService, 'user', 'id')
			};
			
			bookfeedService.createBookfeed(bookfeed).then(function() {
				if (vm.callback) {
					vm.callback();
				}
			});

		});
 	}  
 };