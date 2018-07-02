var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = mongoose.Schema({
	text: String,
	createdAt: { type: Date, default: Date.now },
	creator: { type: Schema.Types.ObjectId, ref: 'User'},
	posts: { type: Schema.Types.ObjectId, ref: 'Post' }
	// upvotes: { type: Number, default:0},
});

const autoPopulateCreator = function(next){
	this.populate({
		path: 'creator',
		select: 'userName createdAt _id'
	});
	next();
}

CommentSchema.pre('find', autoPopulateCreator)

module.exports = mongoose.model('Comment', CommentSchema);
