var express = require('express');
var router = express.Router();
var bcrypt= require('bcryptjs');
var passport = require('passport');

var User = require('../models/user');
var UserPrediction = require('../models/userprediction');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/signup', function(request, response, next) {
  var user = new User(request.body);

  if(user.password != null){
    user.password = '12345';
  }
  user.isadmin = true;
  user.score= 0;
  user.verifiedstatus=0;

  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(user.password, salt, function(err, hash){
      if(err){
        console.log(err);
      }
      user.password = hash;
      user.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
          request.flash('success','You are now registered and can log in');
          response.redirect('/');
        }
      });
    });
  });

});

router.post('/signin', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/home',
    failureRedirect:'/',
    failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/');
});

module.exports = router;
