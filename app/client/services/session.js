module.exports = function(app) {
  app.service('Session',['$window',function($window){

    //TODO maybe update this to store a token so we're not storing raw data

    var username = $window.localStorage.getItem('user');
    var id = $window.localStorage.getItem('id');

    var sessionTracks = {};

    function setUser(value) {
      username = value.name;
      id = value._id;
      $window.localStorage.setItem('user',value.name);
      $window.localStorage.setItem('id',value._id);
    }

    this.login = function(value) {
      setUser(value);
    }

    this.logout = function() {
      $window.localStorage.clear();
    }

    this.getName = function() {
      return username;
    }

    this.getId = function() {
      return id;
    }

    this.setTracks = function(tracks) {
      sessionTracks = tracks;
    }

    this.getTracks = function() {
      return sessionTracks;
    }
  }]);
}
