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
  compatibilityDate: '2025-01-24',
})
