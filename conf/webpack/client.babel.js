const path = require('path')
const { _root } = require('../../env')
const merge = require('webpack-merge')
const base = require('./base.babel')

const _dev = process.env.NODE_ENV === 'development'

module.exports = merge(base, {
  target: 'web',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    path.resolve(_root, 'src/client/render'),
  ],
  output: {
    path: path.resolve(_root, 'lib/client'),
    publicPath: '/',
    filename: 'app.js',
    chunkFilename: '[name].js',
    hotUpdateMainFilename: 'hot-update.json',
    hotUpdateChunkFilename: '[id].hot-update.js',
  },
  optimization: {
    runtimeChunk: 'single',
    namedChunks: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          configFile: path.resolve(__dirname, '../babel/babel.webpack.client'),
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]',
              sourceMap: _dev,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: _dev,
            },
          },
        ],
      },
    ],
  },
})
