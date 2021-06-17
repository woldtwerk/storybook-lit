const { execSync } = require('child_process')

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.compile.tap('wca', () => {
          // custom-elements.json.
          execSync(
            'wca analyze "src/components/**/*.ts" --outFiles custom-elements.json'
          )

          if (config.mode === 'production') {
            // web-component.html-data.json for vscode.
            execSync(
              'wca analyze "src/components/**/*.ts" --outFiles web-component.html-data.json --format vscode'
            )
          }
        })
      },
    })
    config.watchOptions = {
      ignored: /^(?!.*stories\b).*$/,
    }
    return config
  },
}
