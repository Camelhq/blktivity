const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comments');
const CheckAuth = require('../../models/check-auth');
const passport = require('passport')
const express = require('express');
const router = express.Router();
/*********************************************
  this video goes over the API design:
  https://www.youtube.com/watch?v=gtMZ-WiSrs8
*********************************************/


  //post
  router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    // console.log(req.body)
    const { title, text, userId } = req.body;
    User.findOne(req.user._id).then((user) =>{
      // console.log(user)
      const post = new Post({
        title,
        text,
        creator: userId
      })
      // console.log(post)
      post.save(function(err, post){
        if(err){ return next(err); }

        res.json(post);
      });
    })
  });

  //Get all with the creator
  router.get('/', (req, res, next) => {

    Post.find({}).populate({
           path: 'creator',
           select: 'userName createdAt -_id' //you can use -_id to get rid of the ID
         })
         .populate({
           path: 'comments',
         })
    .then((post) => {
      // console.log(post)
      res.json(post)
    })
  });


  /*
  This gets a single comment from a post
  */
  router.get('/:id', (req, res, next) => {
    // console.log(req.params)
     Post.findById(req.params.id)
     .populate({
       path: 'creator',
       select: 'userName createdAt ' //you can use -_id to get rid of the ID
     })
     .populate({
       path: 'comments',
       select: 'text creator userName _id createdAt'
     })
       .exec()
       .then((post) => {
           res.json(post)
          //  .catch((err) => next(err));
       })
       .catch((err) => next(err));
   });



module.exports = router;
