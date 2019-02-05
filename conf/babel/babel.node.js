module.exports = function(api) {
  const baseConfig = require('./babel.base')
  const envConfig = require('./babel.env')({ modules: 'commonjs' }).presets

  api.cache.using(() => process.env.NODE_ENV === 'development')

  const presets = [...envConfig, ...baseConfig.presets]
  const plugins = [...baseConfig.plugins]

  return {
    presets,
    plugins,
  }
}
