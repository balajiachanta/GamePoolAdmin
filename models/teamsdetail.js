var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;


autoIncrement.initialize(mongoose.connection);

// database schema
var teamSchema = new Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  homecity: { type: String, required: true  },
  points: { type: Number, required: true  },
  createduser: { type: String },
  createddttm: { type: Date },
  updateddttm: { type: Date }
}, {
  collection: 'teamdetails'
});

teamSchema.plugin(autoIncrement.plugin, {
  model: 'TeamDetail',
  field: 'teamid',
  startAt: 1,
  incrementBy: 1
});
teamSchema.plugin(autoIncrement.plugin, {
  model: 'TeamDetail',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

// mongoose middlewares
// .pre is called before data is saved to db
teamSchema.pre('save', function(next) {
  var currentDate = new Date(); // get current date

  // if data contains createdDate already
  if (this.createddttm)
    this.updateddttm = currentDate; // set updatedDate to currentDate
  else // else if there is no createdDate
    this.createddttm = currentDate; // set createdDate to currentDate

  next();
});


module.exports = mongoose.model('TeamDetail', teamSchema); 
