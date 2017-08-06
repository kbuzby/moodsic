module.exports = function(app) {
  app.controller('profileController', ['$scope','User','Session',function($scope,User,Session) {
    var user_id = Session.getId();

    User.get(user_id).then(function(user) {
      $scope.user = user;
    });
  }])
}
