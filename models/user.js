var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;


autoIncrement.initialize(mongoose.connection);

// database schema
var userSchema = new Schema({
  
  email: { type: String, required: true },
  password: { type: String, required: true },
  verifiedstatus: { type: Number, required: true  },
  status: { type: Number, required: true  },
  isactive: { type: Boolean, required: true  },
  score: { type: Number,index:true,required:true },
  bonusleft: { type: Number },
  isadmin: { type: Boolean, required: true  },
  createduser: { type: String },
  createddttm: { type: Date },
  updateddttm: { type: Date },
  latestlogindttm: { type: Date }
}, {
  collection: 'users'
});

userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'userid',
  startAt: 1,
  incrementBy: 1
});
userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

// mongoose middlewares
// .pre is called before data is saved to db
userSchema.pre('save', function(next) {
  var currentDate = new Date(); // get current date

  // if data contains createdDate already
  if (this.createddttm)
    this.updateddttm = currentDate; // set updatedDate to currentDate
  else // else if there is no createdDate
    this.createddttm = currentDate; // set createdDate to currentDate

  next();
});


module.exports = mongoose.model('User', userSchema); 
