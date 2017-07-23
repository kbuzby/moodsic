module.exports = function(app) {
  app.config(['$routeProvider','$locationProvider','Session',function($routeProvider, $locationProvider, Session) {

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
    })
    .otherwise({redirectTo: defaultUrl()});

    $locationProvider.html5Mode(true);

    function defaultUrl() {
      if (Session.getUser()) {
        return '/predict';
      }
      else {
        return '/login';
      }
    }
  }])
}
