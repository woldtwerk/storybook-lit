const { execSync } = require("child_process");

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
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.compile.tap('wca', () => {
          // custom-elements.json.
          execSync('wca analyze "stories/**/*.{js,ts}" --outFiles custom-elements.json')

          if(config.mode === 'production') {
            // vscode.
            execSync('wca analyze "stories/**/*.{js,ts}" --outFiles web-component.html-data.json --format vscode')
          }
        });
      }
    })
    config.watchOptions = {
      ignored: /^(?!.*stories\b).*$/,
      // ignored: /.*\.(json)$/,
    }
    return config
  }
}