var app = angular.module('flapperNews', ['ui.router']);
app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }]
      } 
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });
    $urlRouterProvider.otherwise('home'); // if not found, redirect back to home 
  }])

app.factory('posts', ['$http', function($http){
  //service body
  var obj = {
    posts: []
  };

  obj.getAll = function() {
    return $http.get('/posts').success(function(data){
      angular.copy(data, obj.posts);
    });
  };

  obj.create = function(post) {
    return $http.post('/posts', post).success(function(data){
      obj.posts.push(data);
    });
  };

  return obj;
}]);

app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
  $scope.post = posts.posts[$stateParams.id];
  $scope.addComment = function(){
  if($scope.body === '') { return; }
  $scope.post.comments.push({
    body: $scope.body,
    author: 'user',
    upvotes: 0
  });
  $scope.body = '';};
}]);

app.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
  $scope.posts = posts.posts;
  $scope.test = 'Hello world!';

  $scope.addPost = function() {
    if(!$scope.title || $scope.title === '') { return; }
    posts.create({
      title: $scope.title,
      link: $scope.link,
    });
    $scope.title = ''; // clear textbar after calling this func
    $scope.link = ''; // clear the link after calling
  };

  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  }
}]);
