module.exports = function(app) {
  app.controller('editProfileController', ['$scope','$location','User','Session',function($scope,$location,User,Session) {
    var user = Session.getId();

    if (!user) $location.path('login');

    User.get(user).then(function(user) {
      $scope.user = user;
    });

    $scope.saveUser = function() {
      if ($scope.user.name != "") {
        User.update($scope.user._id,$scope.user).then(function(user) {
          Session.setUser(user);
          alert('Updates saved');
          $location.path('/profile');
        })
      }
    }
  }])
}
