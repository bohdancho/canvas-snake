import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

export default defineConfig({
  base: './',
  plugins: [checker({ typescript: true })],
  server: {
    port: 4200,
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
