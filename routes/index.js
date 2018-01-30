var express = require('express');
var router = express.Router();

var MatchDetail = require('../models/matchdetail');
var TeamDetail = require('../models/teamsdetail');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GamePool Admin' });
});
router.get('/matchdetails', function(req, res, next) {
  // get all the users
  TeamDetail.find({}, function(err, teams) {
    if (err) throw err;
    res.render('matchdetails',{teams: teams});
  });
  
});
router.get('/teamdetails', function(req, res, next) {
  res.render('teamdetails');
});

router.post('/matchdetails', function(request, response) {
  
  var matchdetail = new MatchDetail(request.body); // pass the request body to MatchDetail model, this will generate a new user data
  matchdetail.save(function(error, savedUser) {
      if (error)
        response.status(500).send('MatchDetail Internal Server Error 500\n' + error);
      else
        response.status(201).send("Success"); // send newly created user
  });
});

router.post('/teamdetails', function(request, response) {
  
  var teamdetail = new TeamDetail(request.body); // pass the request body to TeamDetail model, this will generate a new user data
  teamdetail.save(function(error, savedUser) {
      if (error)
        response.status(500).send('TeamDetail Internal Server Error 500\n' + error);
      else
        response.status(201).send("Success"); // send newly created user
  });
});

module.exports = router;
