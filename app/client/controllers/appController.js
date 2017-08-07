module.exports = function(app) {
  app.controller('appController',['$scope','$window','Session',function($scope,$window,Session) {
    $scope.session = Session;
    $scope.name = Session.getName();
    $scope.loggedIn = !!$scope.name;
    $scope.logout = function() {
      Session.logout();
      $window.location.href = "/login";
    }


    $scope.$watch('session.getName()',function(name) {
      $scope.name = name;
      $scope.loggedIn = !!name;
    })
  }]);
}
