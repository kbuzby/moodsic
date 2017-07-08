var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trackSchema = new Schema({
  //general info
  title: {type: String},
  duration: {type: Number},
  album_id: {type: Schema.Types.ObjectId, ref: 'Album'},

  //external resources
  echoNest: {
    song_id: {type: String},
    track_id: {type: String}
  },
  genius_id: {type: Number},
  spotify_id: {type: String},

  //measured charactaristics
  mode: {type: Number},
  key: {type: Number},
  tempo: {type: Number},
  danceability: {type: Number},
  energy: {type: Number},
  loudness: {type: Number},
  acousticness: {type: Number},
  liveness: {type: Number},
  instrumentalness: {type: Number},
  hotttness: {type: Number},
  emotion: {
    valence: {type: Number},
    sentiment: {type: Number},
    anger: {type: Number},
    anticipation: {type: Number},
    disgust: {type: Number},
    fear: {type: Number},
    joy: {type: Number},
    sadness: {type: Number},
    surprise: {type: Number},
    trust: {type: Number}
  }
});

module.exports = mongoose.model('Track',trackSchema);
