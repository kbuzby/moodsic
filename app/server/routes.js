//TODO add requires for server controllers
const path = require('path');
const user = require('./controllers/user');
const track = require('./controllers/track');
const artist = require('./controllers/artist');

module.exports = function(app) {

  app.route('/api/user')
    .post(user.create)

  app.route('/api/user/:id')
    .patch(user.update)
    .get(user.get)

  app.route('/api/user/:id/liked_artists')
    .get(user.getLikedArtists)

  app.route('/api/user/:id/add_artist')
    .patch(user.addArtist)

  app.route('/api/user/:id/remove_artist')
    .patch(user.removeArtist)

  app.route('/api/user/:id/change_password')
    .patch(user.changePassword)

  app.route('/api/login')
    .post(user.login)

  app.route('/api/tracks/find_by_mood')
    .get(track.findByMood)

  app.route('/api/tracks/get20')
    .get(track.get20)

  app.route('/api/artists')
    .get(artist.getMany)

  app.get('*',function(req,res) {
    res.sendFile(path.join(__dirname + '/../client/'+'app.html'))
  })
}
