const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const { _root } = require('../../env')
const base = require('./webpack.base')

// const _dev = process.env.NODE_ENV === 'development'

module.exports = merge(base, {
  target: 'node',
  entry: [path.resolve(_root, 'src/server/server')],
  externals: [nodeExternals()],
  output: {
    path: path.resolve(_root, 'lib/server'),
    publicPath: '/',
    filename: 'server.js',
    chunkFilename: '[id]-[name].js',
    hotUpdateMainFilename: 'hot-update.json',
    hotUpdateChunkFilename: '[id].hot-update.js',
    libraryTarget: 'commonjs',
  },
})
