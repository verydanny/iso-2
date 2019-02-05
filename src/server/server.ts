import * as Express from 'express'
import render from './render'
import { _root } from '../../env'

interface IManifestAsset {
  file?: string,
  url?: string,
}

export interface IManifest {
  hash: string,
  publicPath: string,
  assets: {
    js: Array<IManifestAsset>,
    css: [] | Array<IManifestAsset>,
    secondary: [] | Array<IManifestAsset>
  },
  server: {
    hash: string,
    file: string,
  }
}

export const startServer = (req: Express.Request, res: Express.Response, { assets }: IManifest, state) => {
  res.send(render({ title: 'Hello', assets }))
}

