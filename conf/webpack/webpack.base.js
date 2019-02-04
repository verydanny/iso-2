const path = require('path')
const webpack = require('webpack')
const { _root } = require('../../env')

const _dev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: _dev ? 'development' : 'production',
  devtool: _dev ? 'eval' : 'source-map',
  context: path.resolve(_root),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.tsx', '.ts'],
  },
}
