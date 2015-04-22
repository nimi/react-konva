var webpack = require('webpack');

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (process.env.COMPRESS) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
}

module.exports = {

  output: {
    library: 'ReactKonva',
    libraryTarget: 'umd'
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      konva: {
        root: 'Konva',
        commonjs: 'konva',
        commonjs2: 'konva',
        amd: 'konva'
      }
    }
  ],

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader?stage=0&loose=all' }
    ]
  },

  plugins: plugins

};
