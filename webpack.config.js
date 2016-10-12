'use strict';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src/client.js')
  ],
  output: {
    path: path.join(__dirname, 'public/build'),
    filename: 'bundle.js',
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }],
  }
};
