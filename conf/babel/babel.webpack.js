module.exports = function(api) {
  const baseConfig = require('./babel.base')
  const envConfig = require('./babel.env')({ modules: false }).presets

  api.cache(false)

  const presets = [...envConfig, ...baseConfig.presets]
  const plugins = [...baseConfig.plugins]

  return {
    presets,
    plugins,
  }
}
