angular.module('app')

.controller('BookTileController', BookTileController);

 function BookTileController($ionicPopup, bookfeedService, userService, $timeout) {
 	var vm = this;     

 	vm.users = 
            vm.genres = [
              {id: 1, text: 'Business', checked: false, icon: null}, 
              {id: 2, text: 'Science', checked: false, icon: null}, 
              {id : 3, text: 'Mystery', checked: false, icon: null},
              {id : 4, text: 'History', checked: false, icon: null},
              {id : 5, text: 'Economics', checked: false, icon: null},
              {id : 6, text: 'Poetry', checked: false, icon: null}];

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