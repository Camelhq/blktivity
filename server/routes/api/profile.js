const User = require('../../models/User');
const Comment = require('../../models/Comments');
const Profile = require('../../models/Profile');
const passport = require('passport')
const express = require('express');
const router = express.Router();
const multer  = require('multer');






const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './profile/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});



const upload = multer({ storage: storage})
// function checkFileType(file, cb){
//   const filetypes = /jpeg|jpg|png|gif/
//   const extname = filetype.test(path.extname(file.originalname).toLowerCase())
//   const mimetype = filetypes.test(file.mimetype)
//   if(mimetype && extname){
//     return cb(null, true)
//   }else{
//     cb("Error: Images Only")
//   }
// }

  //Get current User /api/profile
  router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Profile.findOne({creator: req.user.id}).then((profile) => {
      if(!profile){
        return res.status(404).json("error something happen with not getting the current user")
      }
      // console.log(profile)
      res.json(profile)
    }).catch((err) => next(err));
  });

  //Post to user Profile /api/profile
  //passport.authenticate('jwt', { session: false }),
  router.post('/', passport.authenticate('jwt', { session: false }), upload.single('file'), (req, res, next) => {
    const { text, userId, postId } = req.body;
    const profilefield = {};
    profilefield.creator = req.user.id;
    if(req.body.handle) profilefield.handle = req.body.handle;
    console.log(req.body.file)
    console.log(req.file)
    // upload(req, res, (err) =>{
      // console.log(req)
      // if(err){
      //   res.send({msg: 'err'})
      // }else{
      //   console.log(req.file)
        // if(req.file === undefined){
        //   res.send({ msg: "Error: No file selected"})
        // }else{
        //   console.log(req.body.headerImage)
        //   // console.log(req.file)
        //   // req.file.path = req.body.headerImage;
        // }
      // }
    // })
    if(req.body.file) profilefield.file = req.body.file;
    if(req.body.company) profilefield.company = req.body.company;
    if(req.body.website) profilefield.website = req.body.website;
    if(req.body.location) profilefield.location = req.body.location;
    if(req.body.instagram) profilefield.instagram = req.body.instagram;
    if(req.body.facebook) profilefield.facebook = req.body.facebook;
    if(req.body.twitter) profilefield.twitter = req.body.twitter;
    if(req.body.bio) profilefield.bio = req.body.bio;

    Profile.findOne({ creator: req.user.id }).then((profile) => {

      if(profile){
        //update profile
        // console.log(profile)
        Profile.findOneAndUpdate(
          { creator: req.user.id },
          { $set: profilefield },
          { new: true }).then((profile) => {
          res.json(profile)
        })
      } else {
        //create profile

        // check if handle exists
        Profile.findOne({ handle: profilefield.handle }).then((profile) => {
          // console.log(profile)
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


  // @ GET /api/profile/handle/:handle
  // @ Get profile handle
  // @ Public
  router.get('/handle/:handle', (req, res, next) => {
    Profile.findOne({ handle: req.params.handle }).then((profile) => {
      if(!profile){
        res.status(404).json({
          message:  "that handle already exists"
        })
      }
      // console.log(profile)
      res.json(profile)
    }).catch((err) => next(err));
  });

  // @ GET /api/profile/user/:userId
  // @ Get profile handle
  // @ Public
  router.get('/user/:user_id', (req, res, next) => {
    Profile.findOne({ creator: req.params.user_id }).then((profile) => {
      if(!profile){
        res.status(404).json({
          message:  "that handle already exists"
        })
      }
      res.json(profile)
    }).catch((err) => next(err));
    //should handle this error better like profile: "there is no profile for this user"
  });


module.exports = router;
