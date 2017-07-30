module.exports = function(app) {
  app.factory('Track',['$http',function($http) {

    function returnData(res) {
      //console.log(res.data);
      return res.data;
    }

    return {
      findByMood: function(uId,q) {
        return $http.get('/api/tracks/find_by_mood?').then(returnData); //TODO finish query string building
      },

      get20: function() {
        return $http.get('/api/tracks/get20').then(returnData);
      }
    }
  }])
}
