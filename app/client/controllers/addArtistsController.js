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

    $scope.addArtist = function(artist) {
      User.addArtist($scope.userId,artist).then(function(artist) {
        $scope.likedArtists.push(artist);
        findAndDelete(artist,$scope.newArtists);
      })
    }

    $scope.removeArtist = function(artist) {
      User.removeArtist($scope.userId,artist).then(function(artist) {
        findAndDelete(artist,$scope.likedArtists);
      })
    }

    $scope.getMore = function() {
      getNewArtists();
    }

    function getNewArtists() {
      Artist.getMany($scope.userId,$scope.likedPage,$scope.generalPage,$scope.generalOffset).then(function(data) {
        $scope.likedPage = data.likedPage;
        $scope.generalPage = data.generalPage;
        $scope.generalOffset = data.generalOffset;
        $scope.newArtists = data.artists;
      });
    }

    function findAndDelete(artist,arr) {
      for (var i in arr) {
        if (arr[i]._id == artist._id) {
          arr.splice(i,1);
          return;
        }
      }
    }

  }]);
}
