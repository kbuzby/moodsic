var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistSchema = new Schema({
  name: {type: String},
  echoNest_id: {type: String},
  genius_id: {type: Number},
  spotify_id: {type: String},
  related_artists: [{type: String}],
  location: {type: String},
  terms: [{type:String}]
});

module.exports = mongoose.model('Artist',artistSchema);
