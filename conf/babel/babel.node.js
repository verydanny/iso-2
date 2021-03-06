module.exports = function(api) {
  const baseConfig = require('./babel.base')
  const envConfig = require('./babel.env')({
    modules: 'commonjs',
    targets: {
      node: 'current',
    },
  }).presets

  api.cache(false)

  const presets = [...envConfig, ...baseConfig.presets]
  const plugins = ['dynamic-import-node', ...baseConfig.plugins]

  return {
    presets,
    plugins,
  }
}
