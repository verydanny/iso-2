module.exports = function(api) {
  const baseConfig = require('./babel.base')
  const envConfig = require('./babel.env')({
    modules: false,
    targets: 'last 1 Chrome versions',
  }).presets

  api.cache.using(() => process.env.NODE_ENV === 'development')

  const presets = [...envConfig, ...baseConfig.presets]
  const plugins = ['@babel/plugin-syntax-dynamic-import', ...baseConfig.plugins]

  return {
    presets,
    plugins,
  }
}
