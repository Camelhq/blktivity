const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: ['./client/index.js', './client/styles/styles.scss'],
  // devtool: 'cheap-module-source-map',
  // mode: 'production',
  mode: 'development',
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  performance: {
    hints: false
  },
   module: {
   rules: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       use: {
         loader: 'babel-loader'
       }
     },
     {
       test: /\.css$/,
       use: [
         'style-loader',
         'css-loader'
       ]
     },
     {
       test: /\.scss$/,
       use: [
           'style-loader', // or MiniCssExtractPlugin.loader
           { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
           { loader: 'sass-loader', options: { sourceMap: true } },
       ],
     },
     {
       test: /\.(png|jpg|svg|gif)$/,
       use: [
         'file-loader',
         {loader: 'image-webpack-loader', options:{name: '[path][name].[ext]', outputPath: 'imgs/'}},
       ]
     },
    // { test: /\.json$/, loader: 'json-loader' }
   ]
 },
 devServer: {
//    proxy: {
//   '/api': 'http://localhost:8080',
//   secure: false
// },
  // contentBase: './client/public',
  // historyApiFallback: true,
  // historyApiFallback: true,
  port: 3000
},

 plugins: [
  new CleanWebpackPlugin('dist', {}),
  new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: false
    },
    hash: true
  }),
  new MiniCssExtractPlugin({
      filename: "dist/[name].css",
  }),
  new CompressionPlugin({
   // asset: "[path].gz[query]",
   // algorithm: "gzip",
   test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
   threshold: 10240,
   minRatio: 0.8
  })
  ],
};
