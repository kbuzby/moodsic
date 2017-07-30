module.exports = function(app) {
  app.controller('resultsController',['$scope','Track',function($scope,Track) {
    Track.get20().then(function(tracks) {
      $scope.tracks = tracks;
    })
  }]);
}
