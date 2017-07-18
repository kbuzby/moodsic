const mongoose = require('mongoose');
const hdf5 = require('hdf5').hdf5;
const h5tb = require('hdf5').h5tb;
const h5lt = require('hdf5').h5lt;
const Access = require('hdf5/lib/globals.js').Access;
const fs = require('fs');
const recursiveRead = require('recursive-readdir');
const path = require('path');
const http = require('http');
const https = require('https');
const async = require('async');
const argv = require('yargs').argv;

const db = require('../app/server/config/db');
const secrets = require('../app/server/config/secrets');
const datadir = secrets.datadir;

var Track = require('./models/track');
var Album = require('./models/album');
var Artist = require('./models/artist');

mongoose.Promise = global.Promise;

mongoose.connect(db.url);

//mongoose.set('debug',true);

console.log('Connecting...');

mongoose.connection.on('error',function(err) {
  console.log(err);
});

mongoose.connection.once('open',function() {
  console.log("Connected");
  run();

});

function run() {
  if (argv.testspotify) {
    var grantType = 'grant_type=client_credentials';

    var req = https.request({
      hostname: 'accounts.spotify.com',
      method: 'POST',
      path: '/api/token',
      auth: secrets.spotify.clientId+':'+secrets.spotify.clientSecret,
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : Buffer.byteLength(grantType)
      }
    }, function (res) {
      var rawData = '';
      res.on('data', function(chunk) { rawData += chunk;});
      res.on('end', function () {
        var data = JSON.parse(rawData);
        var token = data.access_token;
        var current_time = new Date().getTime() / 1000;
        var expires = current_time + data.expires;
        console.log(rawData);
      });
    });

    req.write(grantType);
    req.end();
    //Track.findOne({},function(err,track) {
    //  Album.findById(track.album_id, function (err,album) {
    //    Artist.findById(album.artist_id, function (err, artist) {
    //      searchSpotify(artist,album,track);
    //    })
    //  })
    //})
  }
  else if (argv.testgenius) {
    var searchTerm = 'Kendrick%20Lamar';

    var req = https.get({
      hostname: "api.genius.com",
      method: 'GET',
      path: '/search?q='+searchTerm,
      headers: {
          Authorization: 'Bearer '+secrets.genius.access_token
      }
    }, function(res) {
      var rawData = '';
      res.on('data', function(chunk) {rawData += chunk;});
      res.on('end',function() {
        var data = JSON.parse(rawData);
        console.log(data.response.hits[0]);
      })
    });
    req.on('error',function(err) {
      console.log(err);
    })
    console.log(req);
    req.end();
  }
  else {
    //read all the files in the directory and process each
    recursiveRead(datadir,function(err,files) {
      async.eachSeries(files,function(file,cb) {
        process(file,cb);
      },function(err) {
        if (err) console.log(err);
        console.log('track saved');
      });
    });
  }
}

//process each file in the array
function process(file,cb) {

  var hdf5File = new hdf5.File(file,Access.ACC_RDONLY);
  var hdf5Track = {
    metadata: {},
    analysis: {},
  };
  console.log(file);

  //read the metadata group
  var metadata = hdf5File.openGroup('metadata');
  var songMetadata = h5tb.readTable(metadata.id,'songs');
  for (var i in songMetadata) {
    var arr = songMetadata[i];
    hdf5Track.metadata[arr.name] = arr[0];
  }
  hdf5Track.metadata.similar_artists = h5lt.readDataset(metadata.id,'similar_artists');
  hdf5Track.metadata.artist_terms = h5lt.readDataset(metadata.id,'artist_terms');


  //read the analysis group into hdf5Track
  var analysis = hdf5File.openGroup('analysis');
  var songAnlysis = h5tb.readTable(analysis.id,'songs');
  for (var i in songAnlysis) {
    var arr = songAnlysis[i];
    hdf5Track.analysis[arr.name] = arr[0];
  }

  metadata.close();
  analysis.close();

  hdf5File.close();
  metadata = null;
  songMetadata = null;
  analysis = null;
  songAnlysis = null;

  hdf5File = null;

  hdf5Track.track_id = path.basename(file, '.h5');

  saveArtist(hdf5Track,cb);
}

function saveArtist(hdf5Track,cb) {
  Artist.findOne({echoNest_id: hdf5Track.metadata.artist_id}, function (err, artist) {
    //TODO add error handling

    if (!artist) {
      artist = new Artist({
        name: hdf5Track.metadata.artist_name,
        _id: hdf5Track.metadata.artist_id,
        related_artists: hdf5Track.metadata.similar_artists,
        location: hdf5Track.metadata.artist_location,
        terms: hdf5Track.metadata.artist_terms
      });

      artist.save(function(err) {
        //TODO add error handling
      });
    }

    saveAlbum(hdf5Track,artist._id,cb);
  });
}

function saveAlbum(hdf5Track,artistId,cb) {
  Album.findOne({sevenDigitalId: hdf5Track.metadata.release_7digitalid}, function (err,album) {
    //TODO add error handling

    if (!album) {
      album = new Album({
        name: hdf5Track.metadata.release,
        year: hdf5Track.metadata.year,
        _id: hdf5Track.metadata.release_7digitalid,
        artist_id: artistId
      });
      album.save(function (err) {
        //TODO add error handling
      });
    }
    saveTrack(hdf5Track,album._id,cb);
  });
}

function saveTrack(hdf5Track,albumId,cb) {
  Track.create({
    _id: hdf5Track.trackId,
    title: hdf5Track.metadata.title,
    duration: parseNumber(hdf5Track.analysis.duration),
    album_id: albumId,
    en_song_id:  hdf5Track.metadata.song_id,
    mode: parseNumber(hdf5Track.analysis.mode),
    key: parseNumber(hdf5Track.analysis.key),
    tempo: parseNumber(hdf5Track.analysis.tempo),
    danceability: parseNumber(hdf5Track.analysis.danceability),
    energy: parseNumber(hdf5Track.analysis.energy),
    loudness: parseNumber(hdf5Track.analysis.loudness),
    hotttness: parseNumber(hdf5Track.metadata.song_hotttnesss),
  }, function(err,track) {
    //TODO add error handling
    console.log('inner track saved');

    cb();

    //searchSpotify(artist,album,track);

    //searchGenius(artist,album,track);


  });
}

function searchSpotify(artist,album,track) {
  //TODO

}

function searchGenius(artist,album,track) {
  //TODO
}

function parseNumber(val) {
  return val !== val ? 0.0 : val;
}
