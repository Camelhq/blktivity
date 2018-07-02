var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
	title: String,
	text: String,
  createdAt: { type: Date, default: Date.now },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});


module.exports = mongoose.model('Post', PostSchema);
