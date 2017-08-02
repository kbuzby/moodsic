module.exports = function(app) {
  app.service('Session',['$window',function($window){

    //TODO maybe update this to store a token so we're not storing raw data

    var user = $window.localStorage.getItem('user');

    var sessionTracks = {};

    function setUser(value) {
      user = value;
      $window.localStorage.setItem('user',value);
    }

    this.login = function(value) {
      setUser(value);
    }

    this.logout = function() {
      setUser(null);
    }

    this.getUser = function() {
      return user;
    }

    this.setTracks = function(tracks) {
      sessionTracks = tracks;
    }

    this.getTracks = function() {
      return sessionTracks;
    }
  }]);
}
