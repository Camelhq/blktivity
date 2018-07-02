const User = require('../../models/User');
const Comment = require('../../models/Comments');
const Profile = require('../../models/Profile');
const passport = require('passport')

module.exports = (app) => {

  app.post('/api/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const { text, userId, postId } = req.body;
    const profilefield = {};
    profilefield.user = req.user.id;
    if(req.body.handle) profilefield.handle = req.body.handle;
    if(req.body.company) profilefield.company = req.body.company;
    if(req.body.website) profilefield.website = req.body.website;
    if(req.body.location) profilefield.location = req.body.location;
    if(req.body.instagram) profilefield.instagram = req.body.instagram;
    if(req.body.facebook) profilefield.facebook = req.body.facebook;
    if(req.body.twitter) profilefield.twitter = req.body.twitter;
    if(req.body.bio) profilefield.bio = req.body.bio;

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if(profile){
        //update profile
        Profile.findOneAndUpdate({
          user: req.user._id },
          { $set: profilefield },
          { new: true} ).then((profile) => {
          res.json(profile)
        })
      } else {
        //create profile

        // check if handle exists
        Profile.findOne({ handle: profilefield.handle }).then((profile) => {
          if(profile){
            // error.handle = "that handle already exists"
            res.status(404).json({
              message:  "that handle already exists"
            })
          }
          //save Profile
          new Profile(profilefield).save().then((profile) => {
            res.json(profile)
          })
        })
      }
    })
  });



  //Get all with the creator
  app.get('/api/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Profile.findOne({user: req.user.id }).then((profile) => {
      if(!profile){
        res.status(404).json("error something happen at the the profile route")
      }
      res.json(profile)
    }).catch((err) => next(err));
  });


  /*
  This gets a single profile
  */
  // app.get('/api/profile/:id', (req, res, next) => {
  //    Comment.findById(req.params.id)
  //      .populate({
  //        path: 'comments',
  //        select: 'text creator createdAt'
  //      })
  //      .exec()
  //      .then((post) => {
  //          res.json(post)
  //         //  .catch((err) => next(err));
  //      })
  //      .catch((err) => next(err));
  //  });





   /*
    comments arent posting under its post ID. June 2
    check out for some guildence info:
    https://github.com/keithweaver/MERN-boilerplate/blob/master/server/routes/api/counters.js
   */

}
