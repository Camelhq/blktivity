const stripe = require('stripe')(process.env.STRIPE);
const moment = require('moment');
const User = require('./User');
//
// module.exports = (app) => {
//
//   app.get('/api/payment', (req, res, next) => {
//     stripe.subscriptions.create({
//       customer: "cus_D1Mu9TDA3Ugdls",
//       items: [
//         {
//           plan: "gold",
//         },
//       ]
//     }, function(err, subscription) {
//         // asynchronously called
//       }
//     );
//   });
//
// }

exports.webhook = function (req, res, next) {
  // Store the event ID from the webhook
  const receivedEvent = req.body.data.id;

  // Request to expand the webhook for added security
  stripe.events.retrieve(receivedEvent, (err, verifiedEvent) => {
    if (err) { return next(err); }

      // Respond to webhook events, depending on what they are
    switch (verifiedEvent.type) {
        // On successful customer creation
      case 'customer.created':
        console.log('Customer was created...');
        break;
        // On successful invoice payment
      case 'invoice.payment_succeeded':
        User.findOne({ customerId: verifiedEvent.data.object.customer }, (err, user) => {
          if (err) { return next(err); }

            // Add a month to the user's subscription
          user.stripe.activeUntil = moment().add(1, 'months');

            // Save user with subscription
          user.save((err) => {
            if (err) { return err; }

            console.log(`${user.email} payment was successful. Subscription good until ${user.stripe.activeUntil}.`);
            return res.status(200);
          });
        });
        break;
      case 'invoice.payment_failed':
        User.findOne({ customerId: verifiedEvent.data.object.customer }, (err, user) => {
          if (err) { return next(err); }

            // Send email to customer to inform them their payment failed
          const message = {
            subject: 'Payment Failed',
            text: `You are receiving this because your most recent payment for $${verifiedEvent.data.object.amount_due / 100}failed.` +
              `\nThis could be due to a change or expiration on your provided credit card or interference from your bank.` +
              `\nPlease update your payment information as soon as possible by logging in at http://${req.headers.host}`
          };

          mailgun.sendEmail(user.email, message);
        });
        break;

      default:
        console.log(`Unrecognized action ${verifiedEvent.type} received.`);
    }

      // Return 200 status to inform Stripe the webhook was received
    return res.status(200);
  });
};
