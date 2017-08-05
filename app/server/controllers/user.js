const User = require('../models/user');
const Artist = require('../models/artist');

module.exports = {
  create: create,
  update: update,
  changePassword: changePassword,
  addArtist: addArtist,
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
    res.json({user: new_user._id});
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
    console.log(artist);
    user.liked_artists.push(artist._id);

    user.save(function(err) {
      if (err) res.send(err);
      res.json(artist);
    })
  })
}


function login(req,res) {
  var credentials = req.data;

  User.findOne({username: credentials.username}, function (err,user) {
    if (err) res.send(err);

    if (!user) {
      console.log('user not found' + user.username);
      res.json({status: 'userNotFound'});
    }

    user.comparePassword(credentials.password, function(err,isMatch) {
      if (err) res.send(err);

      if (isMatch) {
        console.log('loggin in '+user.username);
        res.json({status: 'loggedIn', user: user._id});
      }
      else {
        console.log('invalid password');
        res.json({status: 'invalidPassword'});
      }
    })
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
  .populate('liked_artists')
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
