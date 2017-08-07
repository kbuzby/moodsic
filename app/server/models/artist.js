var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artistSchema = new Schema({
  _id: {type: String},
  name: {type: String},
  related_artists: [{type: String,ref: 'Artist'}],
  location: {type: String},
  terms: [{type:String}]
});

module.exports = mongoose.model('Artist',artistSchema);
