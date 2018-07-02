const User = require('../../models/User');
const Comment = require('../../models/Comments');
const Post = require('../../models/Post');
const passport = require('passport')

module.exports = (app) => {

  app.post('/api/comments', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const { text, userId, postId } = req.body;
    // console.log(req.body)
    User.findOne(req.user._id).then((user) => {
      // console.log(user)
      const comment = new Comment({
        text,
        creator: userId,
        posts: postId
      })
      console.log(comment)

      comment.save().then((newComment) => {
        Post.findByIdAndUpdate(
          postId,
          {$push: {'comments': newComment._id }}
        ).then((existingPost) => {

          res.json({
            newComment,
            existingPost
          })
        }).catch((err) => next(err));
      })
    });

  });

  //Get all with the creator
  app.get('/api/comments', (req, res, next) => {
    Comment.find({}).populate({
           path: 'creator',
           select: 'userName createdAt _id' //you can use -_id to get rid of the ID
         })
         .populate({
           path: 'comments',
           select: 'text creator userName _id createdAt'
         }).then((comment) => {
      res.json(comment)
    })
  });

  /*
  This gets a single post
  */
  app.get('/api/comments/:id', (req, res, next) => {
     Comment.findById(req.params.id)
     .populate({
       path: 'creator',
       select: 'userName createdAt ' //you can use -_id to get rid of the ID
     })
     .populate({
       path: 'comments',
       select: 'text creator createdAt'
     })
       .exec()
       .then((post) => {
           res.json(post)
          //  .catch((err) => next(err));
       })
       .catch((err) => next(err));
   });





   /*
    comments arent posting under its post ID. June 2
    check out for some guildence info:
    https://github.com/keithweaver/MERN-boilerplate/blob/master/server/routes/api/counters.js
   */

}
