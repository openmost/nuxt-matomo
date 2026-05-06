import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // Composables guard their work with `if (import.meta.client)`. In production
  // those flags are statically replaced by Nuxt's build, but in unit tests we
  // run the source directly, so we replace them here so the client branch runs.
  define: {
    'import.meta.client': 'true',
    'import.meta.server': 'false',
  },
  resolve: {
    alias: {
      // Compose runs outside Nuxt in unit tests; redirect `#imports` to a tiny
      // stub that exposes a configurable `useRuntimeConfig`.
      '#imports': fileURLToPath(new URL('./test/mocks/imports.ts', import.meta.url)),
    },
  },
})
