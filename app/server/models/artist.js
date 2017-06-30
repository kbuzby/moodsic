const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Schema = mongoose.Schema;

var artistSchema = new Schema({
  name: {type: String},
  echoNest_id: {type: String},
  genius_id: {type: Number},
  spotify_id: {type: String},
  albums: [{album_id: {type: Schema.Types.ObjectId, ref: 'Album'}}],
  related_artists: [{artist_id: {type: Schema.Types.ObjectId, ref: 'Artist'}}],
  location: {type: String},
  terms: [{type:String}]
});

module.exports = mongoose.model('Artist',artistSchema);
