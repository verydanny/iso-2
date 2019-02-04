const express = require('express')
const webpack = require('webpack')
const webpackIsomorphicDevMiddleware = require('webpack-isomorphic-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const { _root } = require('../env')
const clientCompiler = webpack(require('../conf/webpack/webpack.client'))
const serverCompiler = webpack(require('../conf/webpack/webpack.server'))

const app = express()

app.use(
  webpackIsomorphicDevMiddleware(clientCompiler, serverCompiler, {
    memoryFs: true,
    watchDelay: 50,
    notify: { icon: `${_root}/public/favicon.ico` },
  }),
)

app.use(webpackHotMiddleware(clientCompiler, { quiet: true }))

app.use(async (req, res, next) => {
  const { startServer } = res.locals.isomorphic.exports

  await startServer(app)
  next()
})

app.listen(3000, () => 'Server started on port 3000')
