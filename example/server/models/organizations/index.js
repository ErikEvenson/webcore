var
  mongoose = require('mongoose');
  Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  created: {
    default: Date.now,
    type: Date
  },
  creator: {
    ref: 'User',
    type: Schema.ObjectId
  },
  name: {
    required: true,
    type: String
  },
  notes: {
    required: false,
    type: String
  }
});

/** @param {Object} module.exports - Export model. */
module.exports = mongoose.model('Organization', OrganizationSchema);
