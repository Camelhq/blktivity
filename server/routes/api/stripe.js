// var stripe = require('stripe')("sk_test_RBh3T1eg50T04QPlU9vMXF2Q");
// STRIPE_KEY={sk_test_RBh3T1eg50T04QPlU9vMXF2Q}

var STRIPE_PAGINATION_LIMIT = 100;

module.exports = (app) => {


  app.post('/createcustomer', (req, res) => {
    stripe.customers.create({
      description: 'Customer for emma.davis@example.com',
      source: "tok_mastercard" // obtained with Stripe.js
    }, function(err, customer) {
      // asynchronously called
      if(err){
        console.log(err)
      }
      console.log(customer)
    });
});

  app.get('/customers', (req, res) => {
  const options = { limit: STRIPE_PAGINATION_LIMIT }
  if(req.query.starting_after)
    options.starting_after = req.query.starting_after

  if(req.query.ending_before)
    options.ending_before = req.query.ending_before

  stripe.customers.list(
    options,
    function(err, result) {
      // asynchronously called
      console.log(err)
      if(!err){
        res.json(result);
      }
    }
  );
});


app.get('/charges', (req, res) => {
  const options = { limit: STRIPE_PAGINATION_LIMIT }
  if(req.query.starting_after)
    options.starting_after = req.query.starting_after

  if(req.query.ending_before)
    options.ending_before = req.query.ending_before

  stripe.charges.list(
    options,
    function(err, result) {
      // asynchronously called
      if(!err){
        res.json(result);
      }
    }
  );
});

app.get('/customers/:customerId', (req, res) => {
  stripe.customers.retrieve(
    req.params.customerId,
    function(err, customer) {
      if(!err){
        res.json(customer);
      }
    }
  );
});

app.get('/balance', (req, res) => {
  stripe.balance.retrieve(function(err, balance){
      if(!err){
        res.json(balance);
      }
    }
  );
});
}
