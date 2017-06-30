//TODO add requires for server controllers

module.exports = function(app) {

  //TODO add routes to api end points

  app.get('*',function(req,res) {
    res.sendFile(path.join(__dirname + '../client/views/layouts/app.html'))
  })
}
