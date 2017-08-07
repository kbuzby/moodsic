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
      $scope.newPasswordError = false;
      if ($scope.oldPassword == "") {
        $scope.oldPasswordError = true;
      }
      if ($scope.newPassword == "") {
        $scope.newPasswordError = true;
      }
      if (!$scope.newPasswordError && !$scope.oldPasswordError) {
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
    }
  }])
}
