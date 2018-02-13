var passport = require('../config/passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    console.log('passport usage');
  // Local Strategy
  passport.use('local',new LocalStrategy({
      usernameField:'email',
      passwordField:'email',
      passReqToCallback:false
   }, function(email, email, done){
   
    

    User.findOne({'email':email}, function(err, user){
       if(err) throw err;
       console.log(user);
      if(!user){
        return done(null, false, {message: 'No user found'});
      }
      done(null, user);
      
    });

  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}