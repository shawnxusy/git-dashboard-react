/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  id: { type: String, unique: true},
  name: String,
  start: { type: Date, default: Date.now },
  duration: { type: Number, default: 1 }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
Task = mongoose.model('Task', TaskSchema);
