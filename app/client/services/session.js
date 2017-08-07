module.exports = function(app) {
  app.service('Session',['$window',function($window){

    //TODO maybe update this to store a token so we're not storing raw data

    var name = $window.localStorage.getItem('user');
    var id = $window.localStorage.getItem('id');

    var sessionTracks = [];

    function setUser(value) {
      name = value.name;
      id = value._id;
      $window.localStorage.setItem('user',value.name);
      $window.localStorage.setItem('id',value._id);
    }

    this.login = function(value) {
      setUser(value);
    }

    this.setUser = function(user) {
      setUser(user);
    }

    this.logout = function() {
      name = null;
      id = null;
      $window.localStorage.clear();
    }

    this.getName = function() {
      return name;
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
