/** Check if asset is a stylesheet in component dir. */
const cssLangs = `\src\/components\/.*\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`
const cssLangRE = new RegExp(cssLangs)

/**
 * Vite injects imported scss into head by default.
 * This is conflicts with shadow css from wc.
 */
export const disableInjectCssToHead = () => {
  let config
  return {
    name: 'return-partial',
    configResolved(resolvedConfig) {
      config = resolvedConfig
      config.plugins.forEach((plugin) => {
        if (plugin.name === 'vite:css-post') {
          const originalTransform = plugin.transform
          plugin.transform = async function (css, id) {
            return originalTransform(css, id, cssLangRE.test(id))
          }
        }
      })
    },
    handleHotUpdate({ file, server }) {
      if (cssLangRE.test(file)) {
        server.ws.send({
          type: 'full-reload',
          event: 'wc-reload',
        })
      }
    },
  }
}
