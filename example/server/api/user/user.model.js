var
  mongoose = require('mongoose');
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  }
});

/** @param {Object} module.exports - Export model. */
module.exports = mongoose.model('User', UserSchema);
