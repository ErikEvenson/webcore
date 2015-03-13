var
  mongoose = require('mongoose'),
  crypto = require('crypto'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  created: {
    default: Date.now,
    type: Date
  },
  email: {
    match: [
      /.+\@.+\..+/,
      'Please provide a valid e-mail address'
    ],
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
    type: String,
    validate: [
      function(password) {
        return password && password.length > 6;
      }, 'Password should be longer'
    ]
  },
  salt: {
    type: String
  },
  provider: {
    required: 'Provider is required',
    type: String
  },
  providerData: {},
  providerId: String,
  username: {
    required: 'Username is required',
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

UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new Buffer(
      crypto.randomBytes(16).toString('base64'),
      'base64'
    );

    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * @param {String} password -- The password to be hashed.
 * @return {String}
 * @this UserSchema
 */
UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

/**
 * @param {String} password -- The password to be hashed.
 * @return {Boolean}
 * @this UserSchema
 */
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

/**
 * @param {String} username
 * @param {String} suffix
 * @param {Function} cb
 * @this UserSchema
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, cb) {
  var _this = this;
  var possibleUsername = username + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    if (!err) {
      if (!user) {
        cb(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, cb);
      }
    } else {
      cb(null);
    }
  });
};

UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

/** @param {Object} module.exports - Export model. */
module.exports = mongoose.model('User', UserSchema);
