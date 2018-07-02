var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var mongoose = require('mongoose');
// var User = mongoose.model('User');
const User = require('../server/models/User');
// const keys = require('./config');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.userId)
    .then((user) => {
      if(user){
        return done(null, user)
      }
      return done(null, false)
    })
    .catch(err => console.log(err))
    // console.log(jwt_payload)
  })
  )
}
