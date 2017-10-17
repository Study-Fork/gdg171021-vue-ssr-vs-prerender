
const path = require('path')
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.conf');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseConfig, {
  entry: resolve('frontend/entry/app.js'),
  output: {
    path: resolve('public/static/'),
    filename: 'app.js',
  },
});
