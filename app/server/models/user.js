var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
  //account info
  username: {type: String, unique: true, required: true},
  password: {type: String, required: true},

  //bio info
  name: {type: String},
  location: {type: String},
  liked_artists: [{artist_id: {type: Schema.Types.ObjectId, ref: 'Artist'}}]
});


/*https://stackoverflow.com/questions/14588032/mongoose-password-hashing*/
userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('User',userSchema);
