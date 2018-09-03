const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comments');
const passport = require('passport')
const express = require('express');
const router = express.Router();



  router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const { text, userId, postId } = req.body;
    console.log(req.body)
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
  router.get('/', (req, res, next) => {
    Comment.find({}).populate({
           path: 'creator',
           select: 'userName createdAt _id'
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
  router.get('/:id', (req, res, next) => {
     Comment.findById(req.params.id)
     .populate({
       path: 'creator',
       select: 'userName createdAt '
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



module.exports = router;
