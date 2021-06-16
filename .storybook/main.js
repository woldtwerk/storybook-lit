const { execSync } = require('child_process');
const { resolve } = require('path')

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  core: {
    builder: "webpack5"
  },
  webpackFinal: (config) => {
    config.resolve.alias['@helper'] = resolve(__dirname, '../src/helper'),
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.compile.tap('wca', () => {
          // custom-elements.json.
          execSync('wca analyze "stories/**/*.{js,ts}" --outFiles custom-elements.json')

          if(config.mode === 'production') {
            // web-component.html-data.json for vscode.
            execSync('wca analyze "stories/**/*.{js,ts}" --outFiles web-component.html-data.json --format vscode')
          }
        });
      }
    })
    config.watchOptions = {
      ignored: /^(?!.*stories\b).*$/,
    }
    return config
  }
}