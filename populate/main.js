const mongoose = require('mongoose');
const hdf5 = require('hdf5').hdf5;
const h5tb = require('hdf5').h5tb;
const h5lt = require('hdf5').h5lt;
const Access = require('hdf5/lib/globals.js').Access;
const os = require('os');
const fs = require('fs');
const recursiveRead = require('recursive-readdir');
const path = require('path');
const http = require('http');

const datadir = path.join(os.homedir(),'moodsic','data','MillionSongSubset','data');
const db = require('../app/server/config/db')

var Track = require('../app/server/models/track');
var Album = require('../app/server/models/track');
var Artist = require('../app/server/models/artist');

mongoose.connect(db.url, {useMongoClient: true});

//read all the files in the directory and process each
recursiveRead(datadir,function(err,files) {
  for (var i in files) {
    process(files[i]);
  }
})

//TODO process each file in the array
function process(file) {
  var hdf5File = new hdf5.File(file,Access.ACC_RDONLY);
  var hdf5Track = {
    metadata: {},
    analysis: {},
  };

  //read the metadata group
  var metadata = hdf5File.openGroup('metadata');
  var songMetadata = h5tb.readTable(metadata.id,'songs');
  for (var i in songMetadata) {
    var arr = songMetadata[i];
    hdf5Track.metadata[arr.name] = arr[0];
  }
  hdf5Track.metadata.similar_artists = h5lt.readDataset(metadata.id,'similar_artists');
  hdf5Track.metadata.artist_terms = h5lt.readDataset(metdata.id,'artist_terms');

  //read the analysis group into hdf5Track
  var analysis = hdf5File.openGroup('analysis');
  var songAnlysis == h5tb.readTable(analysis.id,'songs');
  for (var i in songAnlysis) {
    var arr = songAnlysis[i];
    hdf5Track.analysis[arr.name] = arr[0];
  }

  //TODO create actual track object from hdf5Track
  var new_track = new Track({
    title: hdf5Track.metadata.title,
    duration: hdf5Track.analysis.duration,
    echoNest: {
      song_id: hdf5Track.metadata.song_id,
      track_id: hdf5Track.metadata.track_id
    },
    mode: hdf5Track.analysis.mode,
    key: hdf5Track.analysis.key,
    tempo: hdf5Track.analysis.tempo,
    danceability: hdf5Track.analysis.danceability,
    energy: hdf5Track.analysis.energy,
    loudness: hdf5Track.analysis.loudness,
    hotttness: hdf5Track.metdata.song_hotttness,
  });

  new_track.save(function(err,track) {
    if (err) handleError(hdf5Track.metadata.track_id,"Problem saving new track",err);

    //search for Album
    Album.findOne({sevenDigitalId: hdf5Track.metadata.release_7digitalid}, function(err,album) {
      if (err) handleError(hdf5Track.metadata.track_id,"Problem finding album",err);

      if (!album) {
        album = new Album({
          name: hdf5Track.metadata.release,
          year: hdf5Track.metadata.year,
          sevenDigitalId: hdf5Track.metadata.release_7digitalid,
        });
      }

      album.tracks.push(track._id);

      album.save(function(err,album) {
        if (err) handleError(hdf5Track.metadata.track_id,"Problem saving album",err);

        Artist.findOne({echoNest_id: hdf5Track.metadata.artist_id}, function(err, artist) {
          if (err) handleError(hdf5Track.metadata.track_id,"Problem finding artist",err);

          if (!artist) {
            artist = new Artist({
              name: hdf5Track.metadata.artist_name,
              echoNest_id: hdf5Track.metadata.artist_id,
              related_artists: hdf5Track.metadata.similar_artists,
              location: hdf5Track.metadata.artist_location,
              terms: hdf5Track.metadata.artist_terms
            });
          }

          artist.albums.push(album._id);

          artist.save(function(err,artist) {
            if (err) handleError(hdf5Track.metadata.track_id,"Problem saving artist",err);

            searchSpotify(artist,album,track);

            searchGenius(artist,album,track);
          });
        });
      });
    });
  });
}

function searchSpotify(artist,album,track) {
  //TODO
}

function searchGenius(artist,album,track) {
  //TODO
}

var errorLog = []

function handleError(trackId,msg,err) {
  //TODO
  if (!errorLog[trackId]) {
    errorLog[trackId] = [];
  }
  errorLog[trackId].push({message: msg, error: err});
}
