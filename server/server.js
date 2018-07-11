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

const config = require('../config/config');
const passportConfig = require('../config/passport');
const webpackConfig = require('../webpack.config');

var babel = require("@babel/core");
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../client/components/App";

import reducers from '../client/reducers/index';


const store = createStore(reducers, compose(applyMiddleware(thunk)))
// compose(applyMiddleware(thunk))(createStore)(duedates)
const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 8080;

const socketEvents = require('./socketEvents');

// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db);
mongoose.Promise = global.Promise;


const io = require('socket.io').listen(8081);
socketEvents(io);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

//set up passport
app.use(passport.initialize())
require('../config/passport')(passport);

//set up server side rendering
app.get( "*", ( req, res ) => {
    const context = { };
    const jsx = (
      <ReduxProvider store={ store }>
        <StaticRouter context={ context } location={ req.url }>
          <App />
        </StaticRouter>
      </ReduxProvider>
     );
    const reactDom = renderToString( jsx );

    const reduxState = store.getState()

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( htmlTemplate( reactDom, reduxState ) );
});

function htmlTemplate( reactDom,  reduxState) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>React SSR</title>
        </head>

        <body>
            <div id="app">${ reactDom }</div>
            <script>
                window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
            </script>
            <script src="./main.js"></script>
        </body>
        </html>
    `;
}


// API routes
require('./routes')(app);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../client/index.html'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log("This is the error from listening on port...." + err);
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;
