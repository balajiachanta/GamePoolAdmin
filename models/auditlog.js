var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;


autoIncrement.initialize(mongoose.connection);

// database schema
var auditSchema = new Schema({
  auditinfo: { type: String, required: true },
  document: { type: String, required: true },
  createduser: { type: String },
  createddttm: { type: Date },
  updateddttm: { type: Date }
}, {
  collection: 'auditlogs'
});

auditSchema.plugin(autoIncrement.plugin, {
  model: 'AuditLog',
  field: 'auditid',
  startAt: 1,
  incrementBy: 1
});
auditSchema.plugin(autoIncrement.plugin, {
  model: 'AuditLog',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

// mongoose middlewares
// .pre is called before data is saved to db
auditSchema.pre('save', function(next) {
    var currentDate = new Date(); // get current date

    // if data contains createdDate already
    if (this.createddttm)
      this.updateddttm = currentDate; // set updatedDate to currentDate
    else // else if there is no createdDate
      this.createddttm = currentDate; // set createdDate to currentDate

    next();
});


module.exports = mongoose.model('AuditLog', auditSchema); // export this user model
