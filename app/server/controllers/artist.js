const Artist = require('../models/artist');
const User = require('../models/user');

module.exports = {
  getMany: getMany
}

function getMany(req,res) {
  var id = req.query.user;
  var likedPage = req.query.likedPage;
  var generalPage = req.query.generalPage;
  var generalOffset = req.query.generalOffset;

  var pageSize = 50;

  var returnArtists = [];

  User.findById(id,'liked_artists',function(err,user) {
    if (err) res.send(err);
    else {
      if (!user) {
        //TODO send user not found error
      }
      else {
        Artist.find({}).where('_id').in(user.liked_artists.map(function(a) {return a._id}))
        .select('_id related_artists name')
        .exec(function(err,artists) {
          if (err) res.send(err);
          else {
            var likedRelatedArtists = [];

            for (var i in artists) {
              for (var j in artists[i].related_artists) {
                if (returnArtists.indexOf(artists[i].related_artists[j]) != -1) {
                  likedRelatedArtists.push({_id: artists[i].related_artists[j]._id, name: artists[i].related_artists[j].name});
                }
              }
            }

            if (likedPage != -1) {
              var min = likedPage * pageSize;
              var max = min + pageSize;

              likedPage++;

              var pages = Math.floor(likedRelatedArtists.length/pageSize);

              if (pages > likedPage) {
                returnArtists = likedRelatedArtists.slice(min,max);
                res.json({likedPage: likedPage, generalPage: 0, generalOffset: 0, artists: returnArtists});
              }
              else {
                returnArtists = likedRelatedArtists.slice(min,likedRelatedArtists.length+1);
                var generalOffset = pageSize - returnArtists.length;

                Artist.find({}).where('_id').nin(likedRelatedArtists.map(function(a) {return a._id}))
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
              Artist.find({}).where('_id').nin(likedRelatedArtists.map(function(a) {return a._id}))
              .skip(generalOffset + (50*generalPage)).limit(pageSize)
              .select('_id name')
              .exec(function(err,artists) {
                if (err) res.send(err);
                else {
                  res.json({likedPage: -1, generalPage: generalPage++, generalOffset: generalOffset, artists: artists});
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
