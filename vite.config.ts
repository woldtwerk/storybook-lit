import { defineConfig } from 'vite'
import { disableInjectCssToHead } from './src/helper/vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      input: ['src/index.ts', 'src/styles/index.scss'],
      external: /^lit(-element)?/,
    },
  },
  plugins: [disableInjectCssToHead()],
})
