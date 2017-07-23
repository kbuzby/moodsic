module.exports = function(app) {
  app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {

    $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'signupController'
    })
    .when('/profile/artists', {
      templateUrl: 'views/add_artists.html',
      conroller: 'addArtistsController'
    })
    .when('/predict', {
      templateUrl: 'views/predict.html',
      controller: 'predictController'
    })
    .when('/results', {
      templateUrl: 'views/results.html',
      controller: 'resultsController'
    });

    $locationProvider.html5Mode(true);
  }])
}
