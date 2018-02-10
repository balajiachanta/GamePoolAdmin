var express = require('express');
var router = express.Router();

var WinnerModel = require('../models/gamewinner');
var MatchDetail = require('../models/matchdetail');
var TeamDetail = require('../models/teamsdetail');
var PlayerDetail = require('../models/playerdetail');

router.get('/details', function(req, res, next) {
  var teams = {};
  var matches={};
  var players={};
  var message = req.query.message;  

  
  // get all the matches
MatchDetail.find({'ismatchover':0,'iswinnerupdated':false}, function(err, matches) {
  if (err){ 
    throw err;
  }else{
  this.matches = matches;
  

  if(matches.length >0 ){

    var teams = new Array();
    var teamquery = TeamDetail.find();
    for (i = 0; i < matches.length; i++) { 
          teams[teams.length] = matches[i].teamone;
          teams[teams.length+1]=matches[i].teamtwo ;
      }
      
      teamquery.where('_id').in(teams);
      teamquery.exec(function(err, teams){
        if (err) {
          throw err;
        }else{
          this.teams = teams;
          var players = new Array();
          var playerquery = PlayerDetail.find();

          for (i = 0; i < teams.length; i++) { 
            players[i] = teams[i].teamid;
          }

          playerquery.where('teamid').in(players);

          playerquery.exec(function(err, players){
            if (err){ 
              throw err;
            }else{
            this.players = players;
            req.flash('success',this.message);
            res.render('winnerdetails',{teams: this.teams, matches : this.matches, players : this.players});
            }

          });
        }
        //{_id:{$in:[matches[0].teamone,matches[0].teamtwo]}
        //{_id:{$in:[teams[0].teamid,teams[1].teamid]}
      });
  
  }else{
    req.flash('success',message);
    res.render('winnerdetails',{teams: {}, matches : this.matches, players : {}});
  }
}  
});
});


router.post('/details', function(request, response) {
  
  // Get Errors
  let errors = request.validationErrors();
  if(errors){

    TeamDetail.find({}, function(err, teams) {
      if (err){throw err;}else{
       
        response.render('winnerdetails',{errors:errors,teams: teams});
       }
    });
  }else{
  var winnerdetail = new WinnerModel(request.body);

  winnerdetail.islotdone = false;
  winnerdetail.iswinnerupdated = true;

  winnerdetail.save(function(error, savedUser) {
      if (error){
        response.status(500).send('winnerdetail Internal Server Error 500\n' + error);
      }
      else{


        MatchDetail.findByIdAndUpdate({_id:winnerdetail.matchid}, {$set: {iswinnerupdated:true}}, {'upsert':true},function(err, teams) {
          if (err) {
            throw err;
          }else{
            response.redirect('/winner/details?message=Winners Noted !! ');
          }
        });

      }
  });
  }
});



module.exports = router;
