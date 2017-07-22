module.exports = function(app) {
  app.controller('loginController',['$window','Session','User',function($window,Session,User) {

    if (Session.user) goToPredictPage();

    $scope.login = function(username,password) {
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
