import * as Express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import render from '../render'
import { IManifest } from '../server-types'

import { App } from '../../containers/app'

export const renderer = (manifest?: IManifest) => (
  _: Express.Request,
  res: Express.Response,
  __: Express.NextFunction,
) => {
  const { assets } = manifest ? manifest : {assets: {
    js: [],
    css: [],
    secondary: []
  }}
  const body = renderToString(React.createElement(App))

  res.send(
    render({ title: 'Hello', assets, body })
  )
}
