var express = require('express');
var router = express.Router();

var MatchDetail = require('../models/matchdetail');
var TeamDetail = require('../models/teamsdetail');

router.get('/details', function(req, res, next) {
  // get all the users
  TeamDetail.find({}, function(err, teams) {
    if (err) throw err;
    res.render('matchdetails',{teams: teams});
  });
  
});


router.post('/details', function(request, response) {
  
  request.checkBody('teamone','Plese select Team One').notEmpty();
  request.checkBody('teamtwo','Plese select Team Two').notEmpty();

  // Get Errors
  let errors = request.validationErrors();
  if(errors){

    TeamDetail.find({}, function(err, teams) {
      if (err){throw err;}else{
        request.flash('success',"Match Detail&Schedule Added")
        response.render('matchdetails',{errors:errors,teams: teams});
       }
    });
  }else{
  var matchdetail = new MatchDetail(request.body); // pass the request body to MatchDetail model, this will generate a new user data
  matchdetail.save(function(error, savedUser) {
      if (error){
        response.status(500).send('MatchDetail Internal Server Error 500\n' + error);
      }
      else{
        TeamDetail.find({}, function(err, teams) {
          if (err){throw err;}else{
            request.flash('success',"Match Detail&Schedule Added")
            response.render('matchdetails',{teams: teams});
           }
        });
      }
  });
}
});



module.exports = router;
