const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 900,
  viewportWidth: 1024,
  e2e: {
    setupNodeEvents(on, config) {},
  },
})
