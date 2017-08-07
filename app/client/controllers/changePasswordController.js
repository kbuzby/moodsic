module.exports = function(app) {
  app.controller('changePasswordController', ['$scope','$location','User','Session',function($scope,$location,User,Session) {

    $scope.userId = Session.getId();

    if (!$scope.userId) $location.path('/login');

    $scope.oldPassword = "";
    $scope.newPassword = "";

    $scope.oldPasswordError = false;
    $scope.newPasswordError = false;

    $scope.change = function() {
      $scope.oldPasswordError = false;
      var data = {oldPassword:$scope.oldPassword,newPassword:$scope.newPassword};
      User.changePassword($scope.userId,data).then(function(data) {
        if (data.err) {
          $scope.oldPasswordError = true;
        }
        else {
          alert('Password updated!');
          $location.path('/profile');
        }
      })
    }
  }])
}
