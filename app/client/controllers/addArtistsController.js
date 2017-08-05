module.exports = function(app) {
  app.controller('addArtistsController',['$scope','Session','User',function($scope,Session,User) {

    $scope.user = Session.getUser();

    $scope.likedArtists = [{id:1,name:'liked1'},{id:2,name:'liked2'}];
    for (var i in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]) {
      $scope.likedArtists.push({id:i,name:'liked'+i});
    }
    $scope.newArtists = [{id:3,name:'new1'},{id:4,name:'new2'}];

    $scope.addArtist = function(userId,artistId) {
      User.addArtist(userId,artistId).then(function(artist) {
        $scope.likedArtists.push(artist);j
      })
    }
  }]);
}
