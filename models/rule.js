var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;


autoIncrement.initialize(mongoose.connection);

// database schema
var ruleSchema = new Schema({
  rulename: { type: String, required: true },
  createduser: { type: String },
  createddttm: { type: Date },
  updateddttm: { type: Date }
}, {
  collection: 'rules'
});

ruleSchema.plugin(autoIncrement.plugin, {
  model: 'Rule',
  field: 'ruleid',
  startAt: 1,
  incrementBy: 1
});
ruleSchema.plugin(autoIncrement.plugin, {
  model: 'Rule',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

// mongoose middlewares
// .pre is called before data is saved to db
ruleSchema.pre('save', function(next) {
    var currentDate = new Date(); // get current date

    // if data contains createdDate already
    if (this.createddttm)
      this.updateddttm = currentDate; // set updatedDate to currentDate
    else // else if there is no createdDate
      this.createddttm = currentDate; // set createdDate to currentDate

    next();
});


module.exports = mongoose.model('Rule', ruleSchema); // export this user model
