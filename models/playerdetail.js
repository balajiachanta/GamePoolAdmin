var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;


autoIncrement.initialize(mongoose.connection);

// database schema
var playerSchema = new Schema({

  teamid: {type: Number, required: true  },
  name: { type: String, required: true },
  city: { type: String },
  createduser: { type: String },
  createddttm: { type: Date },
  updateddttm: { type: Date }
}, {
  collection: 'playerdetails' // save user data to collection named 'users'
});

playerSchema.plugin(autoIncrement.plugin, {
  model: 'PlayerDetail',
  field: 'playerid',
  startAt: 1,
  incrementBy: 1
});
playerSchema.plugin(autoIncrement.plugin, {
  model: 'PlayerDetail',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

// mongoose middlewares
// .pre is called before data is saved to db
playerSchema.pre('save', function(next) {
    var currentDate = new Date(); // get current date

    // if data contains createdDate already
    if (this.createddttm)
      this.updateddttm = currentDate; // set updatedDate to currentDate
    else // else if there is no createdDate
      this.createddttm = currentDate; // set createdDate to currentDate

    next();
});


module.exports = mongoose.model('PlayerDetail', playerSchema);
