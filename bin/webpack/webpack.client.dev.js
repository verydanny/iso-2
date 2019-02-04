const { WebpackPluginServe: Serve } = require('webpack-plugin-serve')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { ROOT } = require('../../env')

module.exports = {
  mode: 'development',
  entry: [path.resolve(ROOT, 'src'), 'webpack-plugin-serve/client'],
  output: {
    path: path.resolve(ROOT, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
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
    new Serve({
      static: path.resolve(ROOT, 'dist'),
      progress: 'minimal',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT, 'template.html'),
    }),
  ],
  watch: true,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.tsx', '.ts'],
  },
}
