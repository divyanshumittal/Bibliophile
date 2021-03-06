angular.module('app')

.controller('BookTileController', BookTileController);

 function BookTileController($ionicPopup, bookfeedService, userService, $timeout, $ionicDB, $state) {
 	var vm = this;
	var bookfeeds = $ionicDB.collection('bookfeeds');
  var users = $ionicDB.collection('customUsers');

 	vm.updateStatus = updateStatus;
 	vm.createRecommendation = createRecommendation;
  vm.goToBookDetails = goToBookDetails;

 	init();

 	function init() {
 		vm.users = angular.copy(userService.users);
 		//remove the logged in user
    vm.users = _.reject(vm.users, {id : userService.user.id});

 		_.forEach(vm.users, function(user) {
 			user.text = user.username;
 			user.checked = false;
 		});

    if (vm.myBook) {
      vm.createdDate = moment(vm.book.createdDate).format("MMM Do, YYYY");
    } else {
      vm.createdDate = moment(vm.book.createdDate).format("MMM Do YY, hh:mm:ss a");
    }

 	}


    function createRecommendation(value) {
        $timeout(function() {
            var recommendedTo = [];
            var recommendedIonicIds = [];

            if (value) {
                if (value.includes(';')) {
                    recommendedTo = value.split(';');
                } else {
                    recommendedTo = [value];
                }

                _.forEach(recommendedTo, function(recommendedUserID) {
                    var recommendation = {
                        status: 'RECOMMENDED',
                        imageUrl: vm.book.imageUrl,
                        recommendedTo: recommendedUserID,
                        title: vm.book.title,
                        authorName: vm.book.authorName,
                        userImgUrl: userService.user.imageUrl,
                        userUUID: userService.user.id,
                        username: userService.user.username,
                        bookPoints: vm.book.bookPoints,
                        createdDate: new Date(),
                        organization: userService.user.organization,
                        createdByAdmin: userService.user.isAdmin,
                        isDeprecated: false,
                        goodReadsId: vm.book.goodReadsId
                    };

                    bookfeedService.createRecommendation(recommendation);
                });

                $ionicPopup.alert({
                     title: vm.book.title + ' has been recommended'
                });

                // recommendedIonicIds = _.map(recommendedTo, function(userId) {
                //    return _.find(vm.users, { id: userId}).ionicId;
                // });
                // bookfeedService.sendNotification(vm.book.title, recommendedIonicIds);
            }
        }, 500);
    }

 	function updateStatus(status) {
	    var bookfeed =  {
			authorName: vm.book.authorName,
			bookPoints: vm.book.bookPoints,
			imageUrl: vm.book.imageUrl,
			name: _.get(userService.user, 'name'),
			status: status,
			title: vm.book.title,
			username: _.get(userService.user, 'username'),
			userUUID: _.get(userService.user, 'id'),
            userImgUrl:  _.get(userService.user, 'imageUrl'),
            createdDate: new Date(),
            organization: _.get(userService.user, 'organization'),
			isDeprecated: false,
            ratings: status === 'STARTED_READING' ? 0 : vm.book.ratings,
            goodReadsId: vm.book.goodReadsId,
            likedBy: []
		};

		//deprecate old feeds for same user for the same book
		bookfeeds.findAll({
            userUUID: _.get(userService.user, 'id'),
            isDeprecated: false,
            title: vm.book.title
        }).fetch().subscribe(function(books) {
            _.forEach(books, function(book) {
            	book.isDeprecated = true;
            	bookfeeds.update(book);
            });
            bookfeedService.createBookfeed(bookfeed);
        });

		if (vm.callback) {
			vm.callback({
                bookObj: vm.book,
                status: status
            });
		}
 	}

  function goToBookDetails() {
    $state.go('app.bookDetails', {
        id: vm.book.goodReadsId,
        title: vm.book.title
    });
  }
 };
