const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var albumSchema = new Schema({
  name: {type: String},
  year: {type: Number},
  sevenDigitalId: {type: String},
  spotify_id: {type: String},
  tracks: [{track_id: {type: Schema.Types.ObjectId, ref: 'Track'}}]
});

module.exports = mongoose.model('Album',albumSchema);
