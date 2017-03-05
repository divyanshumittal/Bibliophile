angular.module('app')

.controller('BookTileController', BookTileController);

 function BookTileController($ionicPopup, bookfeedService, userService, $timeout, $ionicDB) {
 	var vm = this;
	var bookfeeds = $ionicDB.collection('bookfeeds');
  var users = $ionicDB.collection('customUsers');

 	vm.updateStatus = updateStatus;
 	vm.createRecommendation = createRecommendation;

 	init();

 	function init() {
 		vm.users = angular.copy(userService.users);
 		//remove the logged in user
    vm.users = _.reject(vm.users, {id : userService.user.id});

 		_.forEach(vm.users, function(user) {
 			user.text = user.username;
 			user.checked = false;
 		});

    vm.createdDate = moment(vm.book.createdDate, "ddd MMM YYYY hh:mm:ss").format("MMM Do YY, hh:mm:ss a");
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
                        isDeprecated: false
                    };

                    bookfeedService.createRecommendation(recommendation);
                });

                $ionicPopup.alert({
                     title: vm.book.title + ' recommended'
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
            ratings: vm.book.ratings
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

        //increment users score
        if (status === 'READ') {
            userService.user.score += vm.book.bookPoints;
            users.update(userService.user);
        }
 	}
 };
