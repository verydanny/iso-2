export interface IManifestAsset {
  file?: string,
  url?: string,
}

export interface IManifest {
  hash: string,
  publicPath: string,
  assets: {
    js: Array<IManifestAsset>,
    css: [] | Array<IManifestAsset>,
    secondary: [] | Array<IManifestAsset>,
  },
  server: {
    hash: string,
    file: string,
  }
}