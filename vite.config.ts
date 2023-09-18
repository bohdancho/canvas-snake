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
      '~/game': fileURLToPath(new URL('./src/game/gameInstance', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
