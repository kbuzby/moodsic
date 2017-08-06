module.exports = function(app) {
  app.controller('appController',['$scope','$window','Session',function($scope,$window,Session) {
    $scope.name = Session.getName();
    console.log($scope.name);
    $scope.loggedIn = !!$scope.name;
    $scope.logout = function() {
      Session.logout();
      $window.location.href = "/login"
    }
  }]);
}
