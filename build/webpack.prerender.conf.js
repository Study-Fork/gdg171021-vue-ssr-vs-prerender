
const path = require('path')
const webpack = require("webpack");
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.conf');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const TwiggifyWebpackPlugin = require('./twiggify-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseConfig, {
  entry: resolve('frontend/entry/app.js'),
  output: {
    path: resolve('dist/static/'),
    filename: 'app.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.PRERENDER': "true",
    }),
    new HtmlWebpackPlugin({
      template: resolve('build/index.template.html'),
      filename: resolve('dist/index.html'),
    }),
    new PrerenderSpaPlugin(resolve('dist'), [
      '/',
      '/about',
      '/contact',
    ], {
      // captureAfterTime: 2000,
      captureAfterElementExists: '#app > *',
      outputDir: resolve('dist/output'),
      ignoreJSErrors: true,
      postProcessHtml: function (context) {
        return context.html.replace(/http:\/\/localhost:\d+/gi, '');
      },
    }),
    new TwiggifyWebpackPlugin([
      {
        from: resolve('dist/output/index.html'),
        to: resolve('views/_prerendered/index.twig'),
      },
      {
        from: resolve('dist/output/about/index.html'),
        to: resolve('views/_prerendered/about/index.twig'),
      },
      {
        from: resolve('dist/output/contact/index.html'),
        to: resolve('views/_prerendered/contact/index.twig'),
      },
    ], {
      template: resolve('views/vue.twig'),
    }),
  ]
});
