var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;


autoIncrement.initialize(mongoose.connection);

// database schema
var userpredSchema = new Schema({
  userid:{ type:Number, required:true},
  matchid:{ type:Number, required:true},
  tosspred:{ type:Number, required:true},
  winnerpred:{ type:Number, required:true},
  bonusbet:{ type:Number, required:true},
  hspred:{ type:Number, required:true},
  mompred:{ type:Number, required:true},
  userscore:{ 
    tossscore: { type:Number, required:true},
    winnerscore: { type:Number, required:true},
    bonusscore: { type:Number, required:true},
    hsscore: { type:Number, required:true},
    momscore: { type:Number, required:true}
  },
  createduser: { type: String },
  createddttm: { type: Date },
  updateddttm: { type: Date }
}, {
  collection: 'userpredictions'
});

userpredSchema.plugin(autoIncrement.plugin, {
  model: 'UserPrediction',
  field: 'predid',
  startAt: 1,
  incrementBy: 1
});
userpredSchema.plugin(autoIncrement.plugin, {
  model: 'UserPrediction',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

// mongoose middlewares
// .pre is called before data is saved to db
userpredSchema.pre('save', function(next) {
  var currentDate = new Date(); // get current date

  // if data contains createdDate already
  if (this.createddttm)
    this.updateddttm = currentDate; // set updatedDate to currentDate
  else // else if there is no createdDate
    this.createddttm = currentDate; // set createdDate to currentDate

  next();
});


module.exports = mongoose.model('UserPrediction', userpredSchema); 
