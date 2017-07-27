module.exports = function(app) {
  app.controller('profileController', ['$scope','User','Session',function($scope,User,Session) {
    var user_id = Session.getUser();

    User.get(user_id).then(function(user) {
      $scope.user = user;
    });

    $scope.editUser = function() {
      //TODO redirect to edit user profile page
    }

    $scope.likeArtists = function() {
      //TODO redirect to like artists page
    }
  }])
}
