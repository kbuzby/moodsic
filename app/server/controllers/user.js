const User = require('../models/user');
const Artist = require('../models/artist');

module.exports = {
  create: create,
  update: update,
  changePassword: changePassword,
  addArtist: addArtist,
  removeArtist: removeArtist,
  login: login,
  get: get,
  getLikedArtists: getLikedArtists
}

function create(req,res) {
  var new_user = new User(req.body);
  new_user.save(function(err) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    res.json({user: {_id: new_user._id, name: new_user.name}});
  });
}

function update(req,res) {
  User.findByIdAndUpdate(id,data,function(err,user) {
    if (err) res.send(err);
    //TODO send updated user response
  })
}

function changePassword(req,res) {
  var id = req.params.id;
  var old_pass = req.body.password;
  var new_pass = req.body.new_password;

  User.findById(id, function(err,user) {
    if (err) res.send(err);

    if (!user) {
      //TODO send user not found response, but this shouldn't happen at this point
    }

    user.comparePassword(password, function(err,isMatch) {
      if (isMatch) {
        user.password = new_password;
        user.save(function(err) {
          if (err) res.send(err);
          //TODO send updated password response
        })
      }
      else {
        //TODO send invalid password response
      }
    })
  })
}

function addArtist(req,res) {
  var id = req.params.id;
  var artist = req.body;

  User.findById(id, function (err,user) {
    if (err) res.send(err);
    else {
      console.log(artist);
      user.liked_artists.push(artist._id);

      user.save(function(err) {
        if (err) res.send(err);
        res.json(artist);
      })
    }
  })
}

function removeArtist(req,res) {
  var id = req.params.id;
  var artist = req.body;

  User.findById(id, function(err,user) {
    if (err) res.send(err);
    else {
      var found;
      for (var i=0; i < user.liked_artists.length; i++) {
        if (user.liked_artists[i] === artist._id) {
          console.log('found');
          user.liked_artists.splice(i,1);
          found = true;
        }
      }
      user.save(function(err) {
        if (err) res.send(err)
        else if (found) {
          console.log(artist);
          res.json(artist);
        }
      })
    }
  })
}


function login(req,res) {
  var credentials = req.body;
  console.log(credentials);

  User.findOne({username: credentials.username}, function (err,user) {
    if (err) res.send(err);

    if (!user) {
      console.log('user not found ' + credentials.username);
      res.json({status: 'userNotFound'});
    }

    else {
      user.comparePassword(credentials.password, function(err,isMatch) {
        if (err) res.send(err);

        if (isMatch) {
          console.log('logging in '+user.username);
          res.json({status: 'loggedIn', user: {_id: user._id, name: user.name}});
        }
        else {
          console.log('invalid password');
          res.json({status: 'invalidPassword'});
        }
      })
    }
  })
}

function get(req,res) {
  var id = req.params.id;

  User.findById(id,'name username location',function(err,user) {
    if (err) res.send(err);
    else {
      res.json(user);
    }
  })
}

function getLikedArtists(req,res) {
  var id = req.params.id;

  User.findById(id).select('liked_artists')
  .populate('liked_artists','name')
  .exec(function(err,user) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      console.log(user);
      res.json(user.liked_artists);
    }
  })
}
