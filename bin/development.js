import express from 'express'
import webpack from 'webpack'
import * as path from 'path'
// import buildWebpackMiddleware from 'webpack-build-isomorphic'
import webpackDevIso from 'webpack-isomorphic-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import createBuildManifest from './manifest'
import clientConfig from '../conf/webpack/client.babel'
import serverConfig from '../conf/webpack/server.babel'
import { _root } from '../env'
const clientCompiler = webpack(clientConfig)
const serverCompiler = webpack(serverConfig)

const app = express()

app.use(
  webpackDevIso(clientCompiler, serverCompiler, {
    memoryFs: true,
    notify: {
      title: 'Webpack Status',
      icon: path.resolve(_root, 'public/bell.png'),
    },
  }),
)

// app.use(
//   buildWebpackMiddleware(clientCompiler, serverCompiler, {
//     memoryFs: true,
//   }),
// )

app.use(webpackHotMiddleware(clientCompiler, { quiet: true }))

app.use(async (req, res, next) => {
  const { isomorphic } = res.locals
  const { renderer } = isomorphic.exports
  const buildManifest =
    isomorphic.buildManifest || createBuildManifest(isomorphic.compilation)

  renderer(buildManifest)(req, res, next)
  next()
})

app.listen(3000, () => console.log('Listening on port 3000'))
