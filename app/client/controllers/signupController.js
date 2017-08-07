module.exports = function(app) {
  app.controller('signupController',['$scope','$location','Session','User',function($scope,$location,Session,User) {

    $scope.userError = false;

    $scope.signup = function(name,username,password,location) {
      //TODO make sure there's some validation
      User.signup({
        name: name,
        username: username,
        password: password,
        location: location
      }).then(function(retData) {
        if (retData.err) {
          if (retData.err.code == 11000) {
            $scope.userError = true;
          }
        }
        else {
          Session.logout();
          Session.login(retData.user);
          $location.path("/profile/artists");
        }
      })
    }
  }]);
}
