var express = require('express');
var router = express.Router();

var MatchDetail = require('../models/matchdetail');
var TeamDetail = require('../models/teamsdetail');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.user){
    res.redirect('/');
  }else{
    res.render('home', { title: 'GamePool Admin' });
  }
  
  
});

module.exports = router;
