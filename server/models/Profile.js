var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  handle: { type: String, required: true, max: 40 },
  file: { type: String },
  website: { type: String },
  company: { type: String },
  location: { type: String },
  instagram: { type: String },
  facebook: { type: String },
  twitter: { type: String },
  bio: { type: String },
  stripeToken: { type: String}
	// comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});


module.exports = mongoose.model('Profile', ProfileSchema);
