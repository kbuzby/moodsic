module.exports = {
  findByMood: findByMood
}

function findByMood(req,res) {
  var user = req.query.user;
  var req_mode = req.query.mode;
  var req_key = req.query.key;
  var req_tempo = req.query.tempo;
  var req_danceability = req.query.danceability;
  var req_energy = req.query.energy;
  var req_loudness = req.query.loudness;
  var req_hotttness = req.query.hotttness;

  //TODO get artists like by the user

  //TODO adjust the params
  var mode = req_mode;
  var key = req_key;
  var tempo = getRange(req_tempo,20);
  var danceability = getRange(req_danceability,.1)
  var energy = getRange(req_energy,.1);
  var loudness = getRange(req_loudness,.1);
  var hotttness = {
    min: req_hotttness == 0 ? 0 : .5, //TODO going to get a binary value from user so 0 - 0.5 for 0 and .5 to 1 for 1
    max: req_hotttness == 1 ? 1 : .5
  };

  //TODO find the tracks that roughly match the adjusted params - build a query and then exec after it's constructed
  //search on the params first then populate with the related albums and artists
  //then filter to all the related artsist of the liked artists


}

function getRange(val,dif) {
  return {
    min: getMinValue(val,dif);
    max: getMaxValue(val,dif);
  }
}

function getMinValue(val,dif) {
  var new_val = val - dif;
  var ret = new_val < 0 ? 0 : new_val;
  return ret;
}

function getMaxValue(val,dif) {
  var new_val = val + dif;
  var ret = new_val > 1 ? 1 : new_val;
  return ret;
}
