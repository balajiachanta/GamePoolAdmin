var express = require('express');
var router = express.Router();

var TeamDetail = require('../models/teamsdetail');
var PlayerDetail = require('../models/playerdetail');


router.get('/details', function(req, res, next) {
  TeamDetail.find({}, function(err, teams) {
    if (err) "No results";
    res.render('playerdetails',{teams: teams});
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
       
        response.render('playerdetails',{errors:errors,teams: teams});
      }
    });
  }else{
    var playerdetail = new PlayerDetail(request.body); 
    playerdetail.createduser = 'balajiachanta';
    playerdetail.save(function(error, palyertable) {
        if (error){
          response.status(500).send('PlayerDetail Internal Server Error 500\n' + error);
        }
        else{

          TeamDetail.find({}, function(err, teams) {
            if (err){
              "No results";
            } else{
              request.flash('success',"Player Added")
              response.render('playerdetails',{teams: teams});
            }
            
          });
        }
    });
  }

});

module.exports = router;
