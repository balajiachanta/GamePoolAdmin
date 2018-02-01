var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;


autoIncrement.initialize(mongoose.connection);

// database schema
var teamSchema = new Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  homecity: { type: String, required: true  },
  points: { type: Number, required: true  }
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


module.exports = mongoose.model('TeamDetail', teamSchema); 
