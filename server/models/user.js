/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

var mongoose = require('mongoose');

// Other oauthtypes to be added

/*
 User Schema
 */

var UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true, index: true},
  password: String,
  tokens: Array,
  email: String,
  name: { type: String, default: ''},
  picture: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  google: {}
});

/**
 * Statics
 */

UserSchema.statics = {};



module.exports = mongoose.model('User', UserSchema);
