var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
  name: {type: String},
  year: {type: Number},
  sevenDigitalId: {type: String},
  spotify_id: {type: String},
  artist_id: {type: Schema.Types.ObjectId, ref: 'Artist'}
});

module.exports = mongoose.model('Album',albumSchema);
