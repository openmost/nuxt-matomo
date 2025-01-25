<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# Matomo for Nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

<!-- - [🏀 Online playground](https://stackblitz.com/github/openmost/nuxt-matomo?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Quick Setup

1. Add `@openmost/nuxt-matomo` dependency to your project

```bash
# Using pnpm
pnpm add -D @openmost/nuxt-matomo

# Using yarn
yarn add --dev @openmost/nuxt-matomo

# Using npm
npm install --save-dev @openmost/nuxt-matomo
```

2. Add `@openmost/nuxt-matomo` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@openmost/nuxt-matomo'
  ]
})
```

## Config

Register config in the `matomo` section to your `nuxt.config.ts`:
```
runtimeConfig: {
  public: {
    matomo: {
      host: 'https://matomo.example.com',
      containerId: 'xxxxxxxx',
    },
  },
}
```

You can also use variables with your `.env` file:
```
NUXT_PUBLIC_MATOMO_HOST=https://matomo.example.com
NUXT_PUBLIC_MATOMO_CONTAINER_ID=xxxxxxxx
NUXT_PUBLIC_MATOMO_SITE_ID=1
```


<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@openmost/nuxt-matomo/latest.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-version-href]: https://npmjs.com/package/@openmost/nuxt-matomo

[npm-downloads-src]: https://img.shields.io/npm/dm/@openmost/nuxt-matomo.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-downloads-href]: https://npmjs.com/package/@openmost/nuxt-matomo

[license-src]: https://img.shields.io/npm/l/@openmost/nuxt-matomo.svg?style=flat&colorA=18181B&colorB=28CF8D

[license-href]: https://npmjs.com/package/@openmost/nuxt-matomo

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js

[nuxt-href]: https://nuxt.com
