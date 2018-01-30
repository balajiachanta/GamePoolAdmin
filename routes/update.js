var express = require('express');
var router = express.Router();


var TeamDetail = require('../models/teamsdetail');


router.get('/teampoints', function(req, res, next) {
  // get all the users
  TeamDetail.find({}, function(err, teams) {
    if (err) throw err;
    res.render('updatepoints',{teams: teams});
  });
  
});

router.post('/teampoints', function(request, response) {
  
  TeamDetail.findById(request.body.chooseteam,(err,teamdetail) => {

    if (err) {
      res.status(500).send(err);
    } else {
      
      teamdetail.points=request.body.points
      teamdetail.save((error, teampoints) => {
          if (error)
            response.status(500).send('TeamDetail updating points Internal Server Error 500\n' + error);
          else
            response.status(201).send(teampoints); 
      });
    }
  });
});

module.exports = router;
