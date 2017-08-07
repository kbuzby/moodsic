module.exports = function(app) {
  app.controller('profileController', ['$scope','$location','User','Session',function($scope,$location,User,Session) {
    var user_id = Session.getId();

    if (!user_id) $location.path('/login');

    User.get(user_id).then(function(user) {
      $scope.user = user;
    });
  }])
}
