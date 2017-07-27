var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackSchema = new Schema({
  //general info
  _id: {type: String},
  title: {type: String},
  duration: {type: Number},
  album: {type: String, ref: 'Album'},

  //external resources
  en_song_id: {type: String},

  //measured charactaristics
  mode: {type: Number},
  key: {type: Number},
  tempo: {type: Number},
  danceability: {type: Number},
  energy: {type: Number},
  loudness: {type: Number},
  hotttness: {type: Number},
});

module.exports = mongoose.model('Track',trackSchema);
