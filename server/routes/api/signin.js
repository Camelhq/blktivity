const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const jwt = require('jsonwebtoken');
const CheckAuth = require('../../models/check-auth');
var multer  = require('multer');
const gravatar = require('gravatar');
const passport = require('passport')
const express = require('express');
const router = express.Router();

const config = require('../../../config/config');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './profile/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

var upload = multer({ storage: storage})
// , limits:{ fileSize: 400 + 400 }


  // app.get('/api/counters', (req, res, next) => {
  //   Counter.find()
  //     .exec()
  //     .then((counter) => res.json(counter))
  //     .catch((err) => next(err));
  // });
  //
  // app.post('/api/counters', function (req, res, next) {
  //   const counter = new Counter();
  //
  //   counter.save()
  //     .then(() => res.json(counter))
  //     .catch((err) => next(err));
  // });


  // app.delete('/:userId', (req, res, next) => {
  //   User.remove({_id: req.params.userId})
  //   .exec()
  //   .then(result =>{
  //     res.status(200).json({
  //       message: 'User Deleted'
  //     })
  //   }).catch((err) => {
  //     console.log(err)
  //     res.status(500).json({
  //       error: err
  //     })
  //   });
  // })

  router.post('/signup', (req, res, next) => {
    const { body } = req;
    const { userName, password } = body;
    let { email } = body;
    //
    if(!userName){
      return res.json({
        success: false,
        message: 'Error error in First name the server'
      })
    }
    if(!email){
      return res.json({
        success: false,
        message: 'Error error in Email the server'
      })
    }
    if(!password){
      return res.json({
        success: false,
        message: 'Error error in Password the server'
      })
    }

    email = email.toLowerCase();
    // console.log(email)

    User.find({
      email: email
    }, (err, previousUsers) => {
      if(err) {
        return res.send({
          success: false,
          message: 'Error server'
        })
      }
      else if(previousUsers.length >= 1){
        return res.status(409).send({
          success: false,
          message: 'Error: Account already exist'
        })
      } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User();
      newUser.email = email;
      newUser.userName = userName;
      newUser.avatar = avatar;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if(err){
          return res.status(500).send({
            success: false,
            message: 'Error server'
          })
        }
        return res.status(201).send({
          success: true,
          newUser
        })
      })
    }
  })

  });

  router.post('/signin', (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;

    if(!email){
      return res.status(401).send({
        success: false,
        message: 'Error error in Email the server'
      })
    }
    if(!password){
      return res.status(401).send({
        success: false,
        message: 'Error error in Password the server'
      })
    }
    email = email.toLowerCase();

    User.find({ email: email}, (err, users) => {
      if(err){
        return res.send({
          success: false,
          message: 'Error: server'
        })
      }
      if(users.length < 1){
        return res.status(401).send({
          success: false,
          message: 'Error Wrong email or password'
        })
      }
      // const user = new User()
      const user = users[0];
      // console.log(user)
      const userfield = {
          userName: user.userName,
          isDeleted: user.firstName,
          avatar: user.avatar,
          id: user._id,
      }
      // req.session.user = user;
      if(!user.validPassword(password)){
        return res.send({
          success: false,
          message: 'Error is not valid password'
        })
      }

      const userSession = new UserSession();
      // userSession.userId = user._id;
      // const newId = userSession.userId;
      const token = jwt.sign(
        { email: email, userId: user._id },
        config.secretOrKey, { expiresIn: 3600 }
      )
      userSession.userId = token;
      // console.log(users.id)


      userSession.save((err, doc) => {
        // console.log(doc)
        if(err){
          return res.send({
            success: false,
            message: 'Error: server'
          })
        }
        return res.send({
          success: true,
          message: 'Valid sign in',
          // user: userfield,
          token: doc.userId
        })
      })
    })

  });

  router.post('/verify', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if(err){
        return res.send({
          success: false,
          message: 'Error: server error'
        })
      }
      if(sessions.length != 1){
        return res.send({
          success: false,
          message: 'Error: server error'
        })
      } else {
        return res.send({
          success: true,
          message: 'Good'
        })
      }
    })
  });

  router.get('/logout', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {isDeleted: true}
    }, null, (err, sessions) => {
      if(err){
        return res.send({
          success: false,
          message: 'Error: server error'
        })
      }
      return res.send({
        success: true,
        message: 'Good'
      })
    })
  });


module.exports = router;
