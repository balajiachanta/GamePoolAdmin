var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;


autoIncrement.initialize(mongoose.connection);

// database schema
var winnerSchema = new Schema({
  matchid: {type: Number, required: true  },
  teamid: { type: Number, required: true  },
  userids: { type: String },
  winnerscore: {type: Number, required: true },
  tosteamid: { type: Number, required: true },
  momplayerid: {type: Number, required: true },
  hsplayerid: { type: Number, required: true  },
  islotdone: { type: Boolean},
  createduser: { type: String },
  createddttm: { type: Date },
  updateddttm: { type: Date }
}, {
  collection: 'gamewinners' // save user data to collection named 'users'
});

winnerSchema.plugin(autoIncrement.plugin, {
  model: 'GameWinner',
  field: 'winnerid',
  startAt: 1,
  incrementBy: 1
});
winnerSchema.plugin(autoIncrement.plugin, {
  model: 'GameWinner',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

// mongoose middlewares
// .pre is called before data is saved to db
winnerSchema.pre('save', function(next) {
    var currentDate = new Date(); // get current date

    // if data contains createdDate already
    if (this.createddttm)
      this.updateddttm = currentDate; // set updatedDate to currentDate
    else // else if there is no createdDate
      this.createddttm = currentDate; // set createdDate to currentDate

    next();
});


module.exports = mongoose.model('GameWinner', winnerSchema); // export this user model
