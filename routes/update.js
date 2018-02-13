var express = require('express');
var router = express.Router();


var TeamDetail = require('../models/teamsdetail');


router.get('/teampoints', function(req, res, next) {
  if(!req.user){
    res.redirect('/');
  }
  // get all the users
  TeamDetail.find({}, function(err, teams) {
    if (err) throw err;
    res.render('updatepoints',{teams: teams});
  });
  
});

router.post('/teampoints', function(request, response) {
  

request.checkBody('chooseteam',"Please select a team to update points").notEmpty()
// Get Errors
let errors = request.validationErrors();

if(errors){

  TeamDetail.find({}, function(err, teams) {
    if (err) {
      throw err;
    }else{
      response.render('teamdetails', {
        errors:errors,
        teams:teams
      });
    }
  });

  
}else{

  TeamDetail.findById(request.body.chooseteam,(err,teamdetail) => {

    if (err) {
      response.status(500).send(err);
    } else {
      
      teamdetail.points=request.body.points
      teamdetail.save((error, teampoints) => {
          if (error)
            response.status(500).send('TeamDetail updating points Internal Server Error 500\n' + error);
          else{
            
            TeamDetail.find({}, function(err, teams) {
              if (err) {
                throw err;
              }else{
                request.flash('success','Points Updated')
                request.param('teams', teams)
                response.redirect(301,'/team/details');
              }
            });
          }
      });
    }
  });
}
});

module.exports = router;
