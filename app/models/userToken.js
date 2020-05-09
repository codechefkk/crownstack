// import packages
const mongoose    = require('mongoose');

// import helpers
const { required } = require('../utils/model');

const { Schema } = mongoose;

const userTokenSchema = new Schema({
  userId: { type: String, required },
  token: { type: String, required },
}, {
  collection: 'userToken',
  timestamps: true,
});

const UserToken = mongoose.model('UserToken', userTokenSchema);

module.exports = UserToken;
