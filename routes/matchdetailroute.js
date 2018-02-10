var express = require('express');
var router = express.Router();

var MatchDetail = require('../models/matchdetail');
var TeamDetail = require('../models/teamsdetail');


//read message query parmeter  /details?message=tst - req.query.message
// read as request param /details/:id - req.params.id


router.get('/details', function(req, res, next) {
  var teams = {};
  var matches={};
  var message = req.query.message;

      // get all the matches which are not over
    MatchDetail.find({'ismatchover':!0}, function(err, matches) {
      if (err){ 
        throw err;
      }else{
     // this.matches = matches; 
       // get all the teams
        TeamDetail.find({}, function(err, teams) {
          if (err){ throw err}else{
              req.flash('success',message);
              res.render('matchdetails',{teams: teams, matches:matches});
          }
        }); 
      } 
    });
});


router.post('/update', function(req, res) {
  var id = req.body.matchid;
  var ismatchover = req.body.ismatchover;
  MatchDetail.findOneAndUpdate({_id:id},{$set: {ismatchover:ismatchover,iswinnerupdated:false,updateddttm:new Date()}}, {'upsert':true},function(err, matche) {
    if (err) {throw err ;}
    else{
    res.redirect('/match/details?message=Match details updated');
  }
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
        
        response.render('matchdetails',{errors:errors,teams: teams});
       }
    });
  }else{
  var matchdetail = new MatchDetail(request.body); 
  matchdetail.ismatchover = false;
  matchdetail.save(function(error, savedUser) {
      if (error){
        response.status(500).send('MatchDetail Internal Server Error 500\n' + error);
      }
      else{
        response.redirect('/match/details?message=Match Details Added');

        // TeamDetail.find({}, function(err, teams) {
        //   if (err){throw err;}else{
        //     request.flash('success',"Match Details & Schedule Added")
        //     response.render('matchdetails',{teams: teams});
        //    }
        // });


      }
  });
}
});



module.exports = router;
