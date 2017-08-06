module.exports = function(app) {
  app.controller('loginController',['$scope','$window','Session','User',function($scope,$window,Session,User) {

    if (Session.getId()) goToPredictPage();

    $scope.userError = false;
    $scope.passwordError = false;

    $scope.login = function() {
      $scope.userError = false;
      $scope.passwordError = false;

      User.login({username: $scope.username, password: $scope.password}).then(function(retData) {
        if (retData.status == 'loggedIn') {
          Session.login(retData.user);
          goToPredictPage();
        }
        else if (retData.status == 'userNotFound') {
          console.log('user not found');
          $scope.userError = true;
        }
        else if (retData.status == 'invalidPassword') {
          console.log('invalid password');
          $scope.passwordError = true;
        }

      });
    }

    function goToPredictPage() {
      $window.location.href = "/predict";
    }
  }]);
}
