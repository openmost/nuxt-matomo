export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      matomo: {
        host: 'https://matomo.example.com',
        containerId: 'xxxxxxxx',
      },
    },
  },
  compatibilityDate: '2026-04-07',
})
