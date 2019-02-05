import * as path from 'path'
import sortChunks from 'webpack-sort-chunks'
import escapeRegExp from 'lodash/fp/escapeRegExp'
import merge from 'deepmerge'

function parseWebpackStats({ chunks, hash, publicPath }, { compilation }) {
  const assets = sortChunks(chunks, compilation).reduce(
    (assets, chunk) => {
      chunk.files
        .filter(file => !file.endsWith('.map'))
        .forEach(file => {
          const ext = path.extname(file).substr(1)
          const key = chunk.initial ? ext : 'secondary'

          assets[key] = assets[key] || []
          assets[key].push({
            file,
            url: publicPath + file,
          })
        })

      return assets
    },
    { js: [], css: [], secondary: [] },
  )

  return {
    hash,
    publicPath,
    assets,
  }
}

function removeServerBundle(manifest, statsJson) {
  const { entrypoints } = statsJson

  const serverEntrypoint = entrypoints[Object.keys(entrypoints)[0]]
  const serverAsset =
    serverEntrypoint &&
    serverEntrypoint.assets.find(asset => /\.js$/.test(asset))

  const bundleRegExp = new RegExp(`${escapeRegExp(serverAsset)}(\\.map)?$`)
  manifest.assets.js = manifest.assets.js.filter(
    ({ file }) => !bundleRegExp.test(file),
  )

  return serverAsset
}

export default ({ clientStats, serverStats }) => {
  const clientJson = clientStats.toJson()
  const serverJson = serverStats.toJson()

  const clientManifest = parseWebpackStats(clientJson, clientStats)
  const serverManifest = parseWebpackStats(serverJson, serverStats)

  const serverFile = removeServerBundle(serverManifest, serverJson)

  const manifest = merge(serverManifest, clientManifest, {
    arrayMerge: (destinationArray, sourceArray) => [
      ...sourceArray,
      ...destinationArray,
    ],
    clone: true,
  })

  manifest.server = {
    hash: serverManifest.hash,
    file: serverFile,
  }

  return manifest
}
