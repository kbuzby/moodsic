module.exports = function(app) {
  app.controller('predictController',['$scope','$location','Track','Session',function($scope,$location,Track,Session) {

    if (!Session.getId()) $location.path('/signup');

    var defaults = {
      mode: 1,
      hotttness: 1,
      tempo: 140,
      loudness: -15
    }

    $scope.tempoSlider = {
      floor: 40,
      ceil: 240,
      hidePointerLabels: true,
      hideLimitLabels: true
    }

    $scope.loudnessSlider = {
      floor: -30,
      ceil: 0,
      hidePointerLabels: true,
      hideLimitLabels: true
    }

    $scope.req = defaults;

    $scope.predict = function() {
      Track.findByMood(Session.getId(),$scope.req).then(function(tracks) {
        console.log(tracks);
        Session.setTracks(tracks);
        console.log(Session.getTracks());
        $location.path('/results');
      });
    }
  }]);
}
