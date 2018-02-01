var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;


autoIncrement.initialize(mongoose.connection);

// database schema
var matchSchema = new Schema({
  
  gamedetails: { type: String, required: true },
  location: { type: String, required: true },
  groundname: { type: String, required: true  },
  teamone: {type: Number, required: true  },
  teamtwo: { type: Number, required: true  },
  createdttm: { type: Date },
  updateddttm: { type: Date },
  matchdttm: { type:String, required: true  } // dd-mm-yyyy|1-24 hour format
}, {
  collection: 'matchdetails' // save user data to collection named 'users'
});

matchSchema.plugin(autoIncrement.plugin, {
  model: 'MatchDetail',
  field: 'matchid',
  startAt: 1,
  incrementBy: 1
});
matchSchema.plugin(autoIncrement.plugin, {
  model: 'MatchDetail',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

// mongoose middlewares
// .pre is called before data is saved to db
matchSchema.pre('save', function(next) {
    var currentDate = new Date(); // get current date

    // if data contains createdDate already
    if (this.createdDate)
      this.updateddttm = currentDate; // set updatedDate to currentDate
    else // else if there is no createdDate
      this.createdttm = currentDate; // set createdDate to currentDate

    next();
});


module.exports = mongoose.model('MatchDetail', matchSchema); // export this user model
