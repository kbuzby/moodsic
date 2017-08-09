const Track = require('../models/track');
const Album = require('../models/album');
const Artist = require('../models/artist');
const User = require('../models/user');

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
  var req_mode = parseInt(req.query.mode);
  var req_tempo = parseInt(req.query.tempo);
  var req_loudness = parseFloat(req.query.loudness);
  var req_hotttness = parseInt(req.query.hotttness);

  //get artists liked by the user
  var relatedArtists = [];
  User.findById(user,'liked_artists', function(err,user) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      if (user.liked_artists.length > 0){
        for (var i = 0; i< user.liked_artists.length; i++) {
          if (relatedArtists.indexOf(user.liked_artists[i]) == -1){
            relatedArtists.push(user.liked_artists[i]);
          }
        }

        //find all the related artists to the liked artists
        Artist.find({}).where('_id').in(relatedArtists)
        .select('related_artists')
        .exec(function(err,artists) {
          if (err) {
            console.log(err);
            res.send(err);
          }
          else {
            for (var j in artists) {
              for (var k = 0; k<artists[j].related_artists.length; k++) {
                if (relatedArtists.indexOf(artists[j].related_artists[k]) == -1) {
                  relatedArtists.push(artists[j].related_artists[k]);
                }
              }
            }

            req_tempo = 100;
            queryTracks(relatedArtists,req_mode,{min:req_tempo-25,max:req_tempo+25},{min:req_loudness-3,max:req_loudness+3},{min: req_hotttness == 0 ? 0 : .1, max: req_hotttness == 1 ? 1 : .1},res)
          }
        });
      }
      else {
        queryTracks(null,req_mode,{min:req_tempo-25,max:req_tempo+25},{min:req_loudness-3,max:req_loudness+3},{min: req_hotttness == 0 ? 0 : .1, max: req_hotttness == 1 ? 1 : .1},res)
      }
    }
  });
}

function queryTracks(relatedArtists,mode,tempo,loudness,hotttness,res){

  //find the tracks that roughly match the adjusted params - build a query and then exec after it's constructed
  //search on the params first then populate with the related albums and artists
  //then filter to all the related artsist of the liked artists
  var query = Track.find({mode: mode})
  .where('tempo').gte(tempo.min).lte(tempo.max)
  .where('loudness').gte(loudness.min).lte(loudness.max)
  .where('hotttness').gte(hotttness.min).lte(hotttness.max)

  //if the user has liked artists and we have a list of related artists
  //then filter based on them
  if (relatedArtists) {
    query.populate({
      path: 'album',
      select: 'artist name',
      match: {
        artist: {$in: relatedArtists}
      },
      populate: {
        path: 'artist',
        select: 'name'
      }
    });
  }
  else {
    query.populate({
      path: 'album',
      select: 'artist name',
      populate: {
        path: 'artist',
        select: 'name'
      }
    });
  }

  query.select('title album').limit(1000);

  query.exec(function(err,tracks){
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      //remove tracks that didn't get album populated
      //the album wouldn't be populated in cases when we are limiting based on relatedArtists
      tracks = tracks.filter(function(track){
        return track.album !== null;
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
