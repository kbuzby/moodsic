module.exports = function(app) {
  app.controller('resultsController',['$scope','$location','Session','User',function($scope,$location,Session,User) {

    $scope.userId = Session.getId();

    if (!$scope.userId) $location.path('/signup');

    User.getLikedArtists($scope.userId).then(function(liked_artists) {
      $scope.likedArtists = liked_artists;
    })

    $scope.tracks = Session.getTracks();

    if (!$scope.tracks) $location.path('/predict');

    $scope.artistIcon = function(artist) {
      if ($scope.likedArtists) {
        return artistInLiked(artist) ? 'glyphicon-ok' : 'glyphicon-plus';
      }
    }

    $scope.addArtist = function(artist) {
      if (!artistInLiked(artist)){
        User.addArtist($scope.userId,artist).then(function(artist) {
          $scope.likedArtists.push(artist);
        })
      }
    }

    function artistInLiked(artist) {
      for (var i = 0; i < $scope.likedArtists.length; i++) {
        if ($scope.likedArtists[i]._id == artist._id) {
          return true;
        }
      }
      return false;
    }

  }]);
}
