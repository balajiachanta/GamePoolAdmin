var express = require('express');
var router = express.Router();

var TeamDetail = require('../models/teamsdetail');


router.get('/details', function(req, res, next) {
  if(!req.user){
    res.redirect('/');
  }
  TeamDetail.find({}, function(err, teams) {
    if (err) "No results";
    res.render('teamdetails',{teams: teams});
  });
});



router.post('/details', function(request, response) {
  
  request.checkBody('name','Team Name is required').notEmpty();

  // Get Errors
  let errors = request.validationErrors();
  if(errors){

    TeamDetail.find({}, function(err, teams) {
      if (err){
        "No results";
      } else{
        response.render('teamdetails',{errors:errors,teams: teams});
      }
    });
  }else{
    var teamdetail = new TeamDetail(request.body); // pass the request body to TeamDetail model, this will generate a new user data
    teamdetail.createduser = 'balajiachanta';
    teamdetail.save(function(error, savedUser) {
        if (error){
          response.status(500).send('TeamDetail Internal Server Error 500\n' + error);
        }
        else{

          TeamDetail.find({}, function(err, teams) {
            if (err){
              "No results";
            } else{
              request.flash('success',"Team Added")
              response.render('teamdetails',{teams: teams});
            }
            
          });
        }
    });
  }

});

module.exports = router;
