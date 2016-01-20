/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

var FollowSchema = new mongoose.Schema({
  owner: String,
  name: String,
  user: String
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
Follow = mongoose.model('Follow', FollowSchema);
