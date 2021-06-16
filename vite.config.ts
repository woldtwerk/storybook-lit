import { defineConfig } from 'vite'
/** Check if asset is a stylesheet in component dir. */
const cssLangs = `\src\/components\/.*\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`
const cssLangRE = new RegExp(cssLangs)

const disableInjectCssToHead = () => {
  let config
  return {
    name: 'return-partial',
    configResolved(resolvedConfig) {
      config = resolvedConfig
      config.plugins.forEach(plugin => { 
        if (plugin.name === 'vite:css-post') {
          const originalTransform = plugin.transform
          plugin.transform =  async function(css, id) {
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

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // lib: {
    //   entry: 'src/index.ts',
    //   formats: ['es']
    // },
    manifest: true,
    rollupOptions: {
      input: [
        'src/index.ts',
        'src/styles/index.scss'
      ],
      external: /^lit(-element)?/,
    },
  },
  // plugins: [
  //   disableInjectCssToHead(),
  // ]
})
