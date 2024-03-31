const mongoose= require ('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const bcrypt = require ('bcrypt');
const jwt= require ('jsonwebtoken');
const Constants = require('../../config/constants');
const Schema = mongoose.Schema;

const userBasicSchema = new Schema({
  name:String,
  place:String,
  email:String,
  phone:String,
  address:String,
  password:String,
  accessToken:{
    type:String,
    default: '',
  },
  role:{
    type:String,
    default: 'user',
  }
}, {
  timestamps: true,
});

function generateToken() {
  return jwt.sign({
    _id: this._id,
    email: this.email,
  }, Constants.security.sessionSecret, {
    expiresIn: Constants.security.sessionExpiration,
  });
}

userBasicSchema
  .pre('save', function(done) {
  // Encrypt password before saving the document
    if (this.isModified('password')) {
      const {
        saltRounds,
      } = Constants.security;
      _hashPassword(this.password, saltRounds, (err, hash) => {
        this.password = hash;
        done();
      });
    } else {
      done();
    }
  // eslint-enable no-invalid-this
});

userBasicSchema.plugin(autoIncrement.plugin, {
  model: 'user',
  field: 'userID',
  startAt: 100000,
  incrementBy: 1
});

/**
 * Create password hash
 * @private
 * @param {String} password
 * @param {Number} saltRounds
 * @param {Function} callback
 * @return {Boolean} passwords match
 */
function _hashPassword(password, saltRounds = Constants.security.saltRounds, callback) {
  return bcrypt.hash(password, saltRounds, callback);
}


const userModel = mongoose.model('user', userBasicSchema);
module.exports= userModel;
