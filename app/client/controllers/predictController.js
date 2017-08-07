module.exports = function(app) {
  app.controller('predictController',['$scope','$location','Track','Session',function($scope,$location,Track,Session) {

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
      Track.get20().then(function(tracks) {
        console.log(tracks);
        Session.setTracks(tracks);
        console.log(Session.getTracks());
        $location.path('/results');
      })
      //Track.findByMood(Session.getUser(),$scope.req).then(function(tracks) {
      //})
    }
  }]);
}
