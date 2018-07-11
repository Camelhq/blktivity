const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ['./client/index.js', './client/styles/styles.scss'],
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
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
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
    }
   ]
 },
 devServer: {
   port: 3000,
   open: false,
 },
 plugins: [
  new CleanWebpackPlugin(['dist']),
  new HtmlWebpackPlugin({
    template: './client/index.html'
    // favicon: './public/favicon.ico'
  }),
  new MiniCssExtractPlugin({
      filename: "dist/[name].css",
  }),
],
};
