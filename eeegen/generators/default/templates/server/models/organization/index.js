var
  mongoose = require('mongoose');
  Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  }
});

/** @param {Object} module.exports - Export model. */
module.exports = mongoose.model('Organization', OrganizationSchema);
