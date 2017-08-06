module.exports = function(app) {
  app.controller('addArtistsController',['$scope','Session','User','Artist',function($scope,Session,User,Artist) {

    $scope.userId = Session.getId();

    $scope.likedPage = 0;
    $scope.generalPage = 0;
    $scope.generalOffset = 0;

    User.getLikedArtists($scope.userId).then(function(liked_artists) {
      $scope.likedArtists = liked_artists;

      getNewArtists();
    });

    $scope.addArtist = function(userId,artist) {
      User.addArtist(userId,artist).then(function(artist) {
        $scope.likedArtists.push(artist);

        for (var i in $scope.newArtists) {
          if ($scope.newArtists[i]._id === artist._id) {
            $scope.newArtists.splice(i,1);
          }
        }
      })
    }

    $scope.getMore = function() {
      getNewArtists();
    }

    function getNewArtists() {
      Artist.getMany($scope.user,$scope.likedPage,$scope.generalPage,$scope.generalOffset).then(function(data) {
        console.log(data);
        $scope.likedPage = data.likedPage;
        $scope.generalPage = data.generalPage;
        $scope.generalOffset = data.generalOffset;
        $scope.newArtists = data.artists;
      });
    }

  }]);
}
