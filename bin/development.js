import express from 'express'
import webpack from 'webpack'
import * as path from 'path'
import webpackIsomorphicDevMiddleware from 'webpack-isomorphic-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import createBuildManifest from './manifest'
import clientConfig from '../conf/webpack/webpack.client'
import serverConfig from '../conf/webpack/webpack.server'
import { _root } from '../env'
const clientCompiler = webpack(clientConfig)
const serverCompiler = webpack(serverConfig)

const app = express()
const state = {
  server: undefined,
  sockets: [],
  start: undefined,
}

app.use(
  webpackIsomorphicDevMiddleware(clientCompiler, serverCompiler, {
    memoryFs: true,
    notify: {
      title: 'Webpack Status',
      icon: path.resolve(_root, 'public/bell.png'),
    },
  }),
)

app.use(webpackHotMiddleware(clientCompiler, { quiet: true }))

app.use(async (req, res, next) => {
  const { isomorphic } = res.locals
  const { startServer } = isomorphic.exports
  const buildManifest =
    isomorphic.buildManifest || createBuildManifest(isomorphic.compilation)

  startServer(req, res, buildManifest)
})

async function start() {
  state.server = await app.listen(3000, () => console.log('Listening on port 3000'))
  await state.server.on('connection', socket => state.sockets.push(socket))
}

state.start = start
start()
