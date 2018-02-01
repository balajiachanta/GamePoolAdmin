var express = require('express');
var router = express.Router();

var MatchDetail = require('../models/matchdetail');
var TeamDetail = require('../models/teamsdetail');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GamePool Admin' });
});

module.exports = router;
