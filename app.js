var app = angular.module('flapperNews', []);
app.factory('posts', [function(){
  //service body
  var obj = {
    posts: []
  };
  return obj;
}]);
app.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
  $scope.posts = posts.posts;
  $scope.test = 'Hello world!';

  $scope.addPost = function() {
    if(!$scope.title || $scope.title === '') { return; }
    $scope.posts.push({
      title: $scope.title, 
      link: $scope.link,
      upvotes: 0
      });
    $scope.title = ''; // clear textbar after calling this func
    $scope.link = ''; // clear the link after calling
  }

  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  }
}]);