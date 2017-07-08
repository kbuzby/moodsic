var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//mongoose.Promise = global.Promise;

var userSchema = new Schema({
  //account info
  username: {type: String},
  password: {type: String},

  //bio info
  name: {type: String},
  location: {type: String},
  liked_artists: [{artist_id: {type: Schema.Types.ObjectId, ref: 'Artist'}}]
});

module.exports = mongoose.model('User',userSchema);
