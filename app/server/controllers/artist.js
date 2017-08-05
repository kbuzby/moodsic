const Artist = require('../models/artist');
const User = require('../models/user');

const PAGE_SIZE = 50;

module.exports = {
  getMany: getMany
}

function artistInArr(artist,arr) {
  for (var i in arr) {
    if (arr[i]._id == artist._id && arr[i].name == artist.name) {
      return 1;
    }
  }
  return 0;
}

function valInArr(val,arr) {
  for (var i in arr) {
    if (arr[i] == val) {
      return 1;
    }
  }
  return 0;
}

function getMany(req,res) {
  var id = req.query.user;
  var likedPage = parseInt(req.query.likedPage);
  var generalPage = parseInt(req.query.generalPage);
  var generalOffset = parseInt(req.query.generalOffset);
  console.log(generalOffset);

  var returnArtists = [];

  User.findById(id,'liked_artists',function(err,user) {
    if (err) res.send(err);
    else {
      if (!user) {
        //TODO send user not found error
      }
      else {
        //console.log(user.liked_artists);

        Artist.find({}).where('_id').in(user.liked_artists)
        .select('_id related_artists name')
        .populate('related_artists','name')
        .exec(function(err,artists) {
          if (err) res.send(err);
          else {
            //console.log(artists);

            var likedRelatedArtists = [];

            for (var i in artists) {
              for (var j = 0; j<artists[i].related_artists.length; j++) {
                var artist = artists[i].related_artists[j];
                if (!artistInArr(artist,likedRelatedArtists) && !valInArr(artist._id,user.liked_artists) && artist.name !== "") {
                  likedRelatedArtists.push({_id: artist._id, name: artist.name});
                }
              }
            }

            if (likedPage != -1) {
              console.log('liked page:'+likedPage);
              var min = likedPage * PAGE_SIZE;
              var max = min + PAGE_SIZE;

              likedPage++;

              var pages = Math.floor(likedRelatedArtists.length/PAGE_SIZE);
              console.log(pages);

              if (pages >= likedPage) {
                returnArtists = likedRelatedArtists.slice(min,max);
                res.json({likedPage: likedPage, generalPage: 0, generalOffset: 0, artists: returnArtists});
              }
              else {
                returnArtists = likedRelatedArtists.slice(min,likedRelatedArtists.length+1);
                generalOffset = PAGE_SIZE - returnArtists.length;

                Artist.find({}).where('_id').nin(user.liked_artists.concat(likedRelatedArtists.map(function(a) {return a._id})))
                .limit(generalOffset)
                .select('_id name')
                .exec(function(err,artists) {
                  if (err) res.send(err);
                  else {
                    res.json({likedPage: -1, generalPage: 0, generalOffset: generalOffset, artists: returnArtists.concat(artists)});
                  }
                });
              }
            }
            else {
              console.log('generalPage:'+generalPage);
              console.log('generalOffset:'+generalOffset);

              var skip = generalOffset + (50 * generalPage);
              Artist.find({}).where('_id').nin(user.liked_artists.concat(likedRelatedArtists.map(function(a) {return a._id})))
              .skip(skip).limit(PAGE_SIZE)
              .select('_id name')
              .exec(function(err,artists) {
                if (err) res.send(err);
                else {
                  generalPage++;
                  res.json({likedPage: -1, generalPage: generalPage, generalOffset: generalOffset, artists: artists});
                }
              })
            }
          }
        })
      }
    }
  })

  if (likedPage != -1) {

  }
}
