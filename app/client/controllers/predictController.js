module.exports = function(app) {
  app.controller('predictController',['$scope',function($scope) {

    var defaults = {
      mode: 0,
      hotttness: 1,
      tempo: 0,
      energy: 50,
      danceability: 50,
      loudness: 50
    }

    $scope.sliderOptions = {
      floor: 0,
      ceil: 100,
      hidePointerLabels: true,
      hideLimitLabels: true
    }

    $scope.req = defaults;

    $scope.predict = function() {
      //TODO
    }
  }]);
}
