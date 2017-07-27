//TODO add requires for server controllers
const path = require('path');
const user = require('./controllers/user');
const track = require('./controllers/track');

module.exports = function(app) {

  //TODO add routes to api end points
  app.route('/api/user')
    .post(user.create)

  app.route('/api/user/:id')
    .patch(user.update)
    .get(user.get)

  app.route('/api/user/:id/add_artist')
    .patch(user.addArtist)

  app.route('/api/user/:id/change_password')
    .patch(user.changePassword)

  app.route('/api/login')
    .post(user.login)

  app.route('/api/track/find_by_mood')
    .get(track.findByMood)

  app.get('*',function(req,res) {
    res.sendFile(path.join(__dirname + '/../client/'+'app.html'))
  })
}
