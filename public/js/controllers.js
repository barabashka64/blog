"use sctrict";

var blogApp = angular.module('blogApp', ['ngRoute']);

blogApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('');
	$locationProvider.html5Mode(true);
	$routeProvider.
		when('/', {
			templateUrl: 'template/home.html',
			controller: 'indexCtrl'
		}).
		when('/post/:postNumber', {
			templateUrl: 'template/details.html',
			controller: 'detailsCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);

// factory posts

blogApp.factory('postsFactory', [function () {
	
	// default posts

	defaultPosts = [
		{ "subject": "Жизнь",
			"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eveniet harum inventore facere quod fugit nemo beatae ad cum, culpa eos perferendis, qui eaque earum. Aperiam dolorem incidunt nam delectus."},
		{ "subject": "Смерть",
			"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eveniet harum inventore facere quod fugit nemo beatae ad cum, culpa eos perferendis, qui eaque earum. Aperiam dolorem incidunt nam delectus."},	
		{ "subject": "Привет мир!",
			"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eveniet harum inventore facere quod fugit nemo beatae ad cum, culpa eos perferendis, qui eaque earum. Aperiam dolorem incidunt nam delectus."},
		{ "subject": "Выборы президента",
			"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eveniet harum inventore facere quod fugit nemo beatae ad cum, culpa eos perferendis, qui eaque earum. Aperiam dolorem incidunt nam delectus."},
		{ "subject": "Все на митинг!",
			"text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eveniet harum inventore facere quod fugit nemo beatae ad cum, culpa eos perferendis, qui eaque earum. Aperiam dolorem incidunt nam delectus."},
		{ "subject": "Длинный заголовок Длинный заголовок Длинный заголовок Длинный заголовок ",
			"text": "Много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста много текста"}
	];

	serialDefaultPosts = JSON.stringify(defaultPosts);
	iWasHere = sessionStorage.getItem("iWasHere");
	if (!iWasHere) {
		sessionStorage.setItem("iWasHere", true);
		sessionStorage.setItem("posts", serialDefaultPosts);
	};

	posts = JSON.parse(sessionStorage.getItem("posts"));

	return posts;
}]);

// index page controller

blogApp.controller('indexCtrl', ['$scope', '$location', 'postsFactory', function ($scope, $location, postsFactory) {

	$scope.posts = postsFactory;
	$scope.numberOfVisiblePosts = Math.min(3, postsFactory.length);

	$scope.addNumberOfVisiblePosts = function() {
		$scope.numberOfVisiblePosts = $scope.numberOfVisiblePosts + Math.min(3, $scope.posts.length - $scope.numberOfVisiblePosts);
	}

	$scope.addPost = function(newPost, isvalid) {
		if (isvalid) {
			$scope.posts.push({subject: newPost.subject, text: newPost.text});
			$scope.newPost = {};
			$scope.showError = false;
			sessionStorage.setItem("posts", JSON.stringify($scope.posts));
		} else {
			$scope.showError = true;
		}
	};

	$scope.deletePost = function(post) {
		index = $scope.posts.indexOf(post);
		$scope.posts.splice(index, 1);
		sessionStorage.setItem("posts", JSON.stringify($scope.posts));
		if ($scope.numberOfVisiblePosts > $scope.posts.length) {
			$scope.numberOfVisiblePosts = $scope.posts.length
		};
	};

	$scope.getError = function(error) {
		if (angular.isDefined(error)) {
			if (error.required) {
				return 'Это поле обязательно!'
			} else if (error.email) {
				return 'Введите правильный E-mail!'
			} else if (error.pattern) {
				return 'Введите правильный номер телефона!'
			}
		}
	};

}]);

// post details controller

blogApp.controller('detailsCtrl', ['$scope', '$location', '$routeParams', 'postsFactory', function ($scope, $location, $routeParams, postsFactory) {

	$scope.postNumber = $routeParams.postNumber;
	$scope.post = postsFactory[$scope.postNumber];

}]);

// filters

blogApp.filter('abs', function () {
  return function(val) {
    return Math.abs(val);
  }
});

blogApp.filter('subjFilter', function () {
  return function(str) {
  	if (str.length >= 40) {
  		str = str.substr(0, 40) + '...';;
  	}
    return str;
  }
});

blogApp.filter('textFilter', function () {
  return function(str) {
  	if (str.length >= 300) {
  		str = str.substr(0, 300) + '...';;
  	}
    return str;
  }
});