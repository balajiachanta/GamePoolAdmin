var express = require('express');
var router = express.Router();

var WinnerModel = require('../models/gamewinner');
var MatchDetail = require('../models/matchdetail');
var TeamDetail = require('../models/teamsdetail');
var PlayerDetail = require('../models/playerdetail');
var UserPrediction = require('../models/userprediction');
var User = require('../models/user');

const determine = require('../service/compute');

router.get('/details', function(req, res, next) {

    var query = MatchDetail.find();
   
    query.exec(function(err,matches){
        if(err){
          throw err;
        }else{

          res.render('totalschedule',{matches:matches});
        }
    });
});

router.post('/generate', function(req, res) {
  var matchid = req.body.matchid;
  var winnerObject = {};
  var issuccess =false;

  //first find winner for the match
  WinnerModel.findOne({'matchid':matchid},function(err,winner) {
    if (err) {throw err ;}else{

      var userpredwithscore = new Array();

      var userpredquery = UserPrediction.find();
      userpredquery.where('matchid').equals(matchid);
      userpredquery.where('tosspred').gt(0);
      userpredquery.where('winnerpred').gt(0);
      userpredquery.where('winningteamscore').gt(0);
    //find who all users predicted for this match
      userpredquery.exec(function(err,userpred){
        if (err) {throw err ;}else{
          

          if(userpred.length > 0){
            for (i = 0; i < userpred.length; i++) { 
              //compute user scores based predictions and real winner
              var userscore =determine.computewin(userpred[i],winner);
             // update user scores in prediction collection

             UserPrediction.findByIdAndUpdate({_id:userpred[i].id,matchid:userpred[i].matchid}, 
              {$set: {'userscore':userscore,updateddttm:new Date()}},
              {'upsert':true},function(err, predres){
                if(err){throw err}else{
                 
                    User.findById({_id:predres.userid},function(err, users){

                      users.score =users.score+predres.userscore.totscore;
                      if (err) {
                          res.status(500).send(err);
                      } else {
                        users.save(function(err, users){
                          if (err) {throw err ;}
                            else{
                             
                              
                              // update matchdetails isdetermined boneg to match winner update
                              MatchDetail.findOneAndUpdate({_id:predres.matchid},{$set: {isdetermined:true,updateddttm:new Date()}}, {'upsert':true},function(err, match) {
                                if (err) {throw err ;}
                                else{
                                 
                                }
                              });
                            }
                          });
                      }
                    });
                }
              });
            }
         }
         issuccess = false;
        }
      });
      
       res.redirect('/schedule/details?message=true');
    
    }


  });
});


router.get('/selectusers', function(request, response) {

  var user = {};
  var matchid = request.query.matchid;

  UserPrediction.find({'matchid':matchid}).sort({'totscore':'descending'}).exec(function(err,users) {
    if(err){throw err}else{
     
      var userids = new Array();
      var userid =0;
      var userscore = 0;


      if(users.length > 1){
        for(i=0;i<users.length;i++){
          userscore = users[0].totscore;

          if(userscore > 0 && userscore == users[i].totscore){
            console.log(users[i].totscore);
            userids[i] = users[i].userid;
          }
          
        }
      }else{
        userids[0] = users[0].id;
      }

      if(userids.length > 1){
        // need to select random 
       var index = Math.floor(Math.random() * Math.floor(userids.length));
       userid = userids[index];
      
      }else{
        userid = userids[0];
       
      }



      User.findById({_id:userid}, function(err,users){
        if (err) {throw err ;}else{
          //console.log("the b final user "+users);
          MatchDetail.findOneAndUpdate({matchid:matchid},{$set: {lock:true,userids:users.email,updateddttm:new Date()}}, {'upsert':true},function(err, matche) {
            if (err) {throw err ;}
            else{
              response.redirect('/schedule/details?message='+false);
          }
          });

        }
      });

    }

  });


});



module.exports = router;
