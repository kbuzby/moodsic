module.exports = function(app) {
  app.controller('appController',['$scope','$location','Session',function($scope,$location,Session) {
    $scope.name = Session.getName();
    $scope.loggedIn = !!$scope.name;
    $scope.logout = function() {
      Session.logout();
      $location.path("/login");
    }
  }]);
}
