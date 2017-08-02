const Track = require('../models/track');
const Album = require('../models/album');
const Artist = require('../models/artist');

module.exports = {
  findByMood: findByMood,
  get20: get20
}

function get20(req,res) {
  Track.find({},'title album').limit(20).populate({
    path: 'album',
    select: 'artist name',
    populate: {
      path: 'artist',
      select: 'name'
    }
  })
  .exec(function(err,tracks) {
    if (err) console.log(err);
    else res.json(tracks);
  })
}

function findByMood(req,res) {
  var user = req.query.user;
  var req_mode = req.query.mode;
  var req_tempo = req.query.tempo;
  var req_danceability = req.query.danceability;
  var req_energy = req.query.energy;
  var req_loudness = req.query.loudness;
  var req_hotttness = req.query.hotttness;

  //get artists liked by the user
  var relatedArtists = [];
  User.findById(user,'liked_artists', function(err,user) {
    if (err) res.send(err);
    else {
      for (var i in user.liked_artists) {
        if (relatedArtists.indexOf(user.liked_artists[i]) == -1){
          relatedArtists.push(user.liked_artists[i]);
        }
      }
      //find all the related artists to the liked artists
      Artist.find({}).where('_id').in(relatedArtists)
      .select('related_artists')
      .exec(function(err,artists) {
        if (err) res.send(err);
        for (var j in artists) {
          for (var k in artists[j].related_artists) {
            if (relatedArtists.indexOf(artists[j].related_artists[k]) == -1) {
              relatedArtists.push(artists[j].relatedArtists[k]);
            }
          }
        }

        queryTracks(relatedArtists,req_mode,getRange(req_tempo,20),getRange(req_danceability,.1),getRange(req_energy,.1),getRange(req_loudness,.1),{min: req_hotttness == 0 ? 0 : .5, max: req_hotttness == 1 ? 1 : .5})
      })
    }
  });
}

function queryTracks(relatedArtists,mode,tempo,danceability,energy,loudness,hotttness){

  //find the tracks that roughly match the adjusted params - build a query and then exec after it's constructed
  //search on the params first then populate with the related albums and artists
  //then filter to all the related artsist of the liked artists
  var query = Track.find({mode: mode})
  .where('tempo').gte(tempo.min).lte(tempo.max)
  .where('danceability').gte(danceability.min).lte(danceability.max)
  .where('energy').gte(energy.min).lte(energy.max)
  .where('loudness').gte(loudness.min).lte(loudness.max)
  .where('hotttness').gte(hotttness.min).lte(hotttness.max)

  //if the user has liked artists and we have a list of related artists
  //then filter based on them
  if (relatedArtists.length) {
    query.populate({
      path: 'album_id',
      select: 'artist_id name',
      match: {
        artist_id: {$in: relatedArtists}
      },
      populate: {
        path: 'artist_id',
        select: 'name'
      }
    });
  }
  else {
    query.populate({
      path: 'album_id',
      select: 'artist_id name',
      populate: {
        path: 'artist_id',
        select: 'name'
      }
    });
  }

  query.select('title album_id');

  query.exec(function(err,tracks){
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      //remove tracks that didn't get album populated
      //the album wouldn't be populated in cases when we are limiting based on relatedArtists
      tracks = tracks.filter(function(track){
        return track.album.name !== undefined;
      });

      res.json(tracks);
    }
  });
}

function getRange(val,dif) {
  return {
    min: getMinValue(val,dif),
    max: getMaxValue(val,dif)
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
