import webpack from 'webpack'
const path = require('path')
const { _root } = require('../../env')

const _dev = process.env.NODE_ENV === 'development'

module.exports = {
  context: path.resolve(_root),
  mode: _dev ? 'development' : 'production',
  devtool: _dev ? 'cheap-module-eval-source-map' : 'source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    modules: [path.resolve(_root, 'src'), path.resolve(_root, 'node_modules')],
    extensions: ['.js', '.jsx', '.json', '.tsx', '.ts'],
  },
}
