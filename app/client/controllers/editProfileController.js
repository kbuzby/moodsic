module.exports = function(app) {
  app.controller('profileController', ['$scope','User','Session',function($scope,User,Session) {
    var user_id = Session.getUser();

    User.get(user_id).then(function(user) {
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
