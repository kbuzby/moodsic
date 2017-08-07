module.exports = function(app) {
  app.controller('resultsController',['$scope','Session',function($scope,Session) {

    $scope.tracks = Session.getTracks();

  }]);
}
