var express = require('express');
var router = express.Router();

var User = require('../models/user');
var UserPrediction = require('../models/userprediction');


router.post('/predictions',function(request,response){

  var userprediction = new UserPrediction();
      userprediction.userid = 2;
      userprediction.matchid=2;
      userprediction.tosspred=2;
      userprediction.winnerpred=2;
      userprediction.winningteamscore=170;
      userprediction.bonusbet=0;
      userprediction.totscore=0;
      userprediction.save(function(err,preds) {
        if(err){throw err;}else{
          
          console.log(preds);
        }
      });
});



router.post('/details',function(request,response){

  var user = new User();

  user.email = 'balajiachanta@gmail.com';
  user.password='balubalu';
  user.verifiedstatus = 0;
  user.status=0;
  user.isactive=1;
  user.score=0;
  user.bonusleft=4;
  user.isadmin=true;
  user.createduser = 'balajiachanta@gmail.com';
  user.latestlogindttm= new Date();
  user.save(function(err,users) {
    if(err){throw err;}else{
      console.log(users)
      var userprediction = new UserPrediction();
      userprediction.userid = users.userid;
      userprediction.matchid=1;
      userprediction.tosspred=2;
      userprediction.winnerpred=2;
      userprediction.winningteamscore=200;
      userprediction.bonusbet=0;
      userprediction.totscore=0;
      userprediction.save(function(err,preds) {
        if(err){throw err;}else{
          console.log(users);
          console.log(preds);
        }
      });

      
  
    }

  })


});


module.exports = router;
