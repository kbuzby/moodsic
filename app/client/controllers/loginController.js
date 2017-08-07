module.exports = function(app) {
  app.controller('loginController',['$scope','$location','Session','User',function($scope,$location,Session,User) {

    $scope.userError = false;
    $scope.passwordError = false;

    $scope.login = function() {
      $scope.userError = false;
      $scope.passwordError = false;

      User.login({username: $scope.username, password: $scope.password}).then(function(retData) {
        if (retData.status == 'loggedIn') {
          Session.logout();
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
      $location.path("/predict");
    }
  }]);
}
