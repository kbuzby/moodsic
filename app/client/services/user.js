module.exports = function(app) {
  app.factory('User',['$http',function($http) {

    function returnData(res) {
      return res.data;
    }

    return {
      login: function(credentials) {
        return $http.post('/api/user/login',credentials).then(returnData);
      },

      signup: function(user) {
        return $http.post('/api/user/',user).then(returnData);
      },

      update: function(id,data) {
        return $http.patch('/api/user/'+id,data).then(returnData);
      },

      changePassword: function(id,data) {
        return $http.patch('/api/user'+id+'change_password',data).then(returnData);
      },

      addArtist: function(id,artist) {
        return $http.patch('/api/user/'+id+'/add_artist',artist).then(returnData);
      },

      get: function(id) {
        return $http.get('/api/user/'+id).then(returnData);
      },

      getLikedArtists: function(id) {
        return $http.get('/api/user/'+id+'/liked_artists').then(returnData);
      }

    }
  }]);
}
