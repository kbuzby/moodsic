const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Schema = mongoose.Schema;

var trackSchema = new Schema({
  //general info
  title: {type: String},
  duration: {type: Number},

  //external resources
  echoNest: {
    song_id: {type: String},
    track_id: {type: String}
  },
  genius_id: {type: Number},
  spotify_id: {type: String},

  //measured charactaristics
  mode: {type: Number}, //0: minor, 1:major
  key: {type: Number}, //TODO convert this to something more meaningful (c, c sharp, d, e flat, f, f sharp, g, a flat, a, b, b flat) 0-11
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
