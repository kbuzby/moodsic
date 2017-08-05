module.exports = function(app) {
  app.factory('Artist',['$http',function($http) {

    function returnData(res) {
      //console.log(res.data);
      return res.data;
    }

    return {
      getMany: function(userId,likedPage,generalPage,generalOffset) {
        return $http.get('/api/artists?user='+userId+'&likedPage='+likedPage+'&generalPage='+generalPage+'&generalOffset='+generalOffset).then(returnData);
      }
    }
  }])
}
