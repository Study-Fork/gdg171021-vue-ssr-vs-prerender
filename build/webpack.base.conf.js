
const path = require('path');
const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
  return path.resolve(__dirname, "..", dir)
}

let externalLibraries = [
  {
    source: "bootstrap/dist/css/bootstrap.css",
    min: "bootstrap/dist/css/bootstrap.min.css",
    dist: "bootstrap/bootstrap.css",
  },
];

module.exports = {
  resolve: {
    extensions: ['.css', '.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~': resolve('frontend'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [],
};


if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CopyWebpackPlugin(externalLibraries.map(function (plugin) {
      return {
        from: resolve("node_modules/" + plugin.min),
        to: resolve("public/static/" + plugin.dist),
      };
    })),
    new UglifyJSPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ]);
} else {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CopyWebpackPlugin(externalLibraries.map(function (plugin) {
      return {
        from: resolve("node_modules/" + plugin.source),
        to: resolve("public/static/" + plugin.dist),
      };
    }))
  ]);
}
