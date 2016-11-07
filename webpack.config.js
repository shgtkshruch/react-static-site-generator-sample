const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const ejs = require('ejs');
const fs = require('fs');

const template = ejs.compile(fs.readFileSync(__dirname + '/src/layout.ejs', 'utf-8'));

const scope = { window: {} };

module.exports = {
  entry: {
    main: './src/index.js'
  },

  output: {
    path: 'dist',
    filename: 'index.js',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css?modules')
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("style.css"),
    new StaticSiteGeneratorPlugin('index.js', ['/index.html', '/about.html'], { template }, scope)
  ]

};
