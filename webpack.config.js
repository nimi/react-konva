var webpack = require('webpack');

module.exports = {
  entry: {
    'react-konva': ['./react-konva'],
    'smoke-test': './demo/smoke-test.js',
    'rectangles': './demo/rectangles',
    'plane-game': './demo/plane-game.js'
  },
  output: {
    path: 'build',
    filename: '[name].js',
    library: 'ReactKonva',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony'}
    ]
  },
  externals: {
    react: {
      root: "React",
      commonjs: "react",
      commonjs2: "react",
      amd: "react"
    },
    konva: {
      root: "Konva",
      commonjs: "konva",
      commonjs2: "konva",
      amd: "konva"
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("react-konva", "react-konva.js")
  ]
};
