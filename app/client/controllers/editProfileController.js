module.exports = function(app) {
  app.controller('editProfileController', ['$scope','User','Session',function($scope,User,Session) {
    var user = Session.getId();

    User.get(user).then(function(user) {
      $scope.user = user;
    });

    $scope.saveUser = function() {
      //TODO save changes
    }

    $scope.changePassword = function() {
      //TODO redirect to change password page
    }
  }])
}
