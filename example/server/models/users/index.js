var
  mongoose = require('mongoose');
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  created: {
    default: Date.now,
    type: Date
  },
  email: {
    match: /.+\@.+\..+/,
    type: String
  },
  name: {
    first: {
      required: true,
      type: String
    },
    last: {
      required: true,
      type: String
    }
  },
  organization: {
    ref: 'Organization',
    type: Schema.Types.ObjectId
  },
  password: {
    type: String
  },
  username: {
    required: true,
    trim: true,
    type: String,
    unique: true
  }
});

/**
 * @param {String} username
 * @param {Function} cb - A callback.
 * @this UserSchema
 */
UserSchema.statics.findOneByUsername = function(username, cb) {
  this.findOne({username: new RegEx(username, 'i')}, cb);
};

/** @param {Object} module.exports - Export model. */
module.exports = mongoose.model('User', UserSchema);
