const express = require('express');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport')
const cors = require('cors')
const helmet = require('helmet')

const config = require('../config/config');
const passportConfig = require('../config/passport');
const webpackConfig = require('../webpack.config');

const comments = require('./routes/api/comments');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const signin = require('./routes/api/signin');
const stripe = require('./routes/api/stripe');
// const dashboard = require('./routes/api/dashboard');


const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 8080;
require('dotenv').config()
// const socketEvents = require('./socketEvents');

// Configuration
// ================================================================================================

// Set up Mongoose
// const env = (db) => {
//   if(db === db_dev){
//     config.db_dev
//   }
//   return config.db
// }
mongoose.connect(isDev ? process.env.DB_DEV : process.env.DB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;


// const io = require('socket.io').listen(8081);
// socketEvents(io);

const app = express();
app.use(helmet())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors())


// app.use(session({
// 	secret: "cats",
// 	resave: true,
// 	saveUninitialized: false
// }));

//set up passport
app.use(passport.initialize())
app.use(passport.session());
require('../config/passport')(passport);

app.use('/api/comments', comments);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/account', signin);
app.use('/api/account', stripe);


// API routes
// require('./routes')(app);
app.use(express.static('dist'));
//   app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, '/dist/index.html'));
//     res.end();
//   });


app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log("This is the error from listening on port...." + err);
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;
