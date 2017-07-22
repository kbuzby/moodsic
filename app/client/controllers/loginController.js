module.exports = function(app) {
  app.controller('loginController',['$scope','$window','Session','User',function($scope,$window,Session,User) {

    if (Session.getUser()) goToPredictPage();

    $scope.login = function(username,password) {

      //TODO make sure there's some validation
      User.login({username: username, password: password}).then(function(retData) {
        Session.login(retData.user);
        goToPredictPage();
      });
    }

    function goToPredictPage() {
      $window.location.href = "/predict";
    }
  }]);
}
