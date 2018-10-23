const stripe = require('stripe')(process.env.STRIPE);
const User = require('../../models/User');
const Profile = require('../../models/Profile');
require('dotenv').config()
const UserSession = require('../../models/UserSession');
const jwt = require('jsonwebtoken');
const passport = require('passport')
const express = require('express');
const router = express.Router();


var STRIPE_PAGINATION_LIMIT = 100;

//create a product first
//
router.get('/product', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  stripe.products.list(
    { limit: 3 },
    function(err, products) {
      // asynchronously called
      if(err){
        console.log("could not reteive products ", err)
      }
      console.log(products)
    });

});


// router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//   const plan = stripe.plans.create({
//     product: 'prod_CbvTFuXWh7BPJH',
//     nickname: 'SaaS Platform USD',
//     currency: 'usd',
//     interval: 'month',
//     amount: 10000,
//   });
// });
//
// router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//   const subscription = stripe.subscriptions.create({
//     customer: 'cus_4fdAW5ftNQow1a',
//     items: [{plan: 'plan_CBXbz9i7AIOTzr'}],
//   });
// });


router.post('/create', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const token = req.body.token;
    if(!token){
      return res.send({
        success: "failed",
        message: "Not a user and No token"
      })
    }
    Profile.findOne({ creator: req.user.id }).then((profile) => {
    stripe.customers.create({
      source: token // obtained with Stripe.js
    }, function(err, customer) {
      // asynchronously called
      if(err){
        console.log(err)
      }
      // console.log(customer.id)
      profile.stripeToken = customer.id
      // console.log(profile)
      //else add user to USER Model into databaseID
      // res.json(profile)
    });
  })
});

// router.get('/charges', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//   const options = { limit: STRIPE_PAGINATION_LIMIT }
//   if(req.query.starting_after)
//     options.starting_after = req.query.starting_after
//
//   if(req.query.ending_before)
//     options.ending_before = req.query.ending_before
//
//   stripe.charges.list(
//     options,
//     function(err, result) {
//       // asynchronously called
//       if(!err){
//         res.json(result);
//       }
//     }
//   );
// });
//


module.exports = router;
