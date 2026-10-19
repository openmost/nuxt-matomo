# Changelog

## v3.0.0

[compare changes](https://github.com/openmost/nuxt-matomo/compare/v2.2.0...v3.0.0)

### ⚠️ Breaking changes

- Nuxt 4.1+ is now required (`compatibility.nuxt: '>=4.1.0'`).
- The Matomo Tag Manager container is now loaded by [Nuxt Scripts](https://scripts.nuxt.com), once the app is ready (`trigger: 'onNuxtReady'`) instead of immediately. Set `trigger: 'client'` to load it as early as before.

### 🚀 Enhancements

- Build on top of Nuxt Scripts: `@nuxt/scripts` is installed and registered automatically, and Matomo Tag Manager is listed in the Nuxt Scripts registry and in Nuxt DevTools.
- New `useScriptMatomoTagManager()` composable exposing the script status, `load()` and a typed `_mtm` queue.
- New `trigger` option (`'onNuxtReady'`, `'client'` or `'manual'`, env `NUXT_PUBLIC_MATOMO_TRIGGER`) to load the container after consent.
- New `pageViewEvent` option to disable the automatic `page_view` event.
- New `src` option on `useScriptMatomoTagManager()` to use a custom container URL.
- `useMatomoGoal()` accepts an optional revenue.
- Development-time validation of `host` and `containerId`.

### 🩹 Fixes

- The `page_view` event now relies on Nuxt Scripts' `useScriptEventPage`, which waits for unhead to render the page title.
- The container is never injected with an invalid or missing URL.

### 🏡 Chore

- Upgrade to `@nuxt/kit` 4, `@nuxt/devtools` 3, `@nuxt/eslint-config` 1, `vue-tsc` 3, `vitest` 5 and `changelogen` 0.6.
- Remove the legacy `.eslintrc`, `.eslintignore` and pnpm-only `.npmrc`.
- The playground ships a fake container, and the README has been rewritten.

### ❤️ Contributors

- Ronan HELLO <ronan56.hello@gmail.com>

## v2.1.4

[compare changes](https://github.com/openmost/nuxt-matomo/compare/v2.1.3...v2.1.4)

### 🩹 Fixes

- Matomo Cloud ([30ce601](https://github.com/openmost/nuxt-matomo/commit/30ce601))

### ❤️ Contributors

- Ronan HELLO <ronan56.hello@gmail.com>

## v2.1.3

[compare changes](https://github.com/openmost/nuxt-matomo/compare/v2.1.1...v2.1.3)

### 🩹 Fixes

- EventValue type in composable ([67bf1da](https://github.com/openmost/nuxt-matomo/commit/67bf1da))

### ❤️ Contributors

- Ronan HELLO <ronan56.hello@gmail.com>

## v2.1.1

[compare changes](https://github.com/openmost/nuxt-matomo/compare/v2.0.2...v2.1.1)

## v2.1.0

fix: Matomo Cloud /js/ prefix in container URL

## v2.0.2

[compare changes](https://github.com/openmost/nuxt-matomo/compare/v2.0.1...v2.0.2)

## v2.0.1

[compare changes](https://github.com/openmost/nuxt-matomo/compare/v1.0.7...v2.0.1)

### 🩹 Fixes

- Route to in matomo tracker ([e2d73d7](https://github.com/openmost/nuxt-matomo/commit/e2d73d7))

### ❤️ Contributors

- Ronan <ronan56.hello@gmail.com>

