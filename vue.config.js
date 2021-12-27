module.exports = {
    pluginOptions: {
      electronBuilder: {
        preload: 'src/preload.js',
        builderOptions: {
            nodeIntegration: true,
            contextIsolation: true
        }
      }
    }
  }