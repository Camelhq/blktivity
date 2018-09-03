const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const jwt = require('jsonwebtoken');
// const CheckAuth = require('../../models/check-auth');
var multer  = require('multer');
const passport = require('passport')
const express = require('express');
const router = express.Router();


// CheckAuth,

  // router.get('/dashboard',  upload.single('avatar'), passport.authenticate('jwt', { session: false }), (req, res, next) => {
  //   // console.log(req.user._id)
  //   User.findById(req.user._id)
  //   .select('-password')
  //   .exec()
  //   .then((doc) =>{
  //     // console.log(doc)
  //     if(!doc){ return res.status(404).end(); }
  //     return res.status(200).json(doc)
  //   })
  //   .catch(err => next(err));
  // });

  module.exports = router;
