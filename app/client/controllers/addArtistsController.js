module.exports = function(app) {
  app.controller('addArtistsController',['$scope','Session','User','Artist',function($scope,Session,User,Artist) {

    $scope.user = Session.getUser();

    var likedPage = 0;
    var generalPage = 0;
    var generalOffset = 0;

    User.getLikedArtists($scope.user).then(function(liked_artists) {
      $scope.likedArtists = liked_artists;

      Artist.getMany($scope.user,likedPage,generalPage,generalOffset).then(function(artists) {
        $scope.newArtists = artists;
      })
    });

    $scope.addArtist = function(userId,artistId) {
      User.addArtist(userId,artistId).then(function(artist) {
        $scope.likedArtists.push(artist);j
      })
    }

    $scope.getMore = function() {
      Artist.getMany($scope.user,likedPage,generalPage,generalOffset).then(function(artists) {
        $scope.newArtists = artists;
      })
    }

  }]);
}
