module.exports = function(app) {
  app.controller('appController',['$scope','Session',function($scope,Session) {

    $scope.loggedIn = !!Session.getUser();
    $scope.logout = function() {
      Session.logout();
    }
  }]);
}
