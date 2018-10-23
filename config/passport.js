require('dotenv').config()
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var mongoose = require('mongoose');
const passport = require('passport')
// var User = mongoose.model('User');
const User = require('../server/models/User');

// require('../config/passport')(passport);
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
opts.secretOrKey = process.env.SECRET_OR_KEY

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.userId)
    .then((user) => {
      if(user){
        return done(null, user)
      }
      return done(null, false)
    })
    .catch(err => console.log("Something went wrong in the JwtStrategy config.passport: " + err))
  })
  )
}
