module.exports = function(app) {
  app.controller('signupController',['$scope','$window','Session','User',function($scope,$window,Session,User) {

    if (Session.getUser()) goToPredictPage();

    $scope.signup = function(name,username,password,location) {
      //TODO make sure there's some validation
      User.signup({
        name: name,
        username: username,
        password: password,
        location: location
      }).then(function(retData) {
        Session.login(retData.user);
        goToPredictPage();
      })
    }

    function goToPredictPage() {
      $window.location.href = "/predict";
    }
  }]);
}
