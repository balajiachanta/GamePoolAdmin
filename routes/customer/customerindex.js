var express = require('express');
var router = express.Router();

var MatchDetail = require('../../models/matchdetail');
var TeamDetail = require('../../models/teamsdetail');

var logic = require('../../service/logic');

/* GET home page. */
router.get('/', function(req, res, next) {
  // if(!req.user){
  //   res.redirect('/');
  // }else{

  var query = MatchDetail.find({});
  query.sort({'matchid':'asc'}).exec(function(err, matches){
    if(err){throw err;}else{
      TeamDetail.find({},function(err,teams) {

        var matchary =new Array();
      
        

      for(match =0; match < matches.length ;match++){
        var matchobj = new Object();
        matchobj.matchid = matches[match].matchid;
        matchobj.gamedetails = matches[match].gamedetails;
        matchobj.matchdttm = matches[match].matchdttm;
        matchobj.teamone = matches[match].teamone;
        matchobj.teamtwo = matches[match].teamtwo;
        matchobj.teamonelogo = logic.findTeamLogo(teams, matches[match].teamone);
        matchobj.teamtwologo = logic.findTeamLogo(teams, matches[match].teamtwo);
        matchary[match] = matchobj;
      }
        

        res.render('./customer/home',{matches:matchary,teams:teams});
      });
     
    }
  });
   
  //}
 
});


router.post('/', function(req, res) {

  console.log(req.body.tossselection);
  console.log(req.body.winselection);
 

});



module.exports = router;
