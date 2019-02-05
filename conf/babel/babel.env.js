module.exports = ({ modules }) => ({
  presets: [
    [
      '@babel/preset-env',
      {
        modules: modules,
      },
    ],
  ],
})
