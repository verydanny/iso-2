const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const { _root } = require('../../env')
const base = require('./base.babel')

// const _dev = process.env.NODE_ENV === 'development'

module.exports = merge(base, {
  target: 'node',
  entry: [path.resolve(_root, 'src/server/server')],
  externals: [nodeExternals()],
  output: {
    path: path.resolve('lib/server'),
    filename: 'server.js',
    chunkFilename: '[name].js',
    hotUpdateMainFilename: 'hot-update-server.json',
    hotUpdateChunkFilename: '[id].hot-update-server.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          configFile: path.resolve(__dirname, '../babel/babel.webpack.node'),
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
    ],
  },
})
