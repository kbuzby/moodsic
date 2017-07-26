var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var albumSchema = new Schema({
  name: {type: String},
  year: {type: Number},
  _id: {type: String},
  artist_id: {type: String, ref: 'Artist', index: true}
});

module.exports = mongoose.model('Album',albumSchema);
