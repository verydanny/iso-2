module.exports = ({ modules, targets }) => ({
  presets: [
    [
      '@babel/preset-env',
      {
        targets,
        modules: modules,
      },
    ],
  ],
})
