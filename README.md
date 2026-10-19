# Matomo for Nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

[Matomo Tag Manager](https://matomo.org/guide/tag-manager/getting-started-with-tag-manager/) for Nuxt 4.1+, built on top of [Nuxt Scripts](https://scripts.nuxt.com).

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 &nbsp;Playground](/playground)

## Features

- 🚀 **Loads your Matomo Tag Manager container with [Nuxt Scripts](https://scripts.nuxt.com)**: non-blocking by default (`onNuxtReady`), shows up in Nuxt DevTools, SSR-safe.
- 🧭 **Single-page app page views that just work**: a `page_view` event with the resolved URL, referrer and **final page title** is pushed on every navigation, so your Matomo tag never records a stale title.
- 🍪 **Consent-friendly**: set `trigger: 'manual'` and load the container once the visitor opts in.
- ☁️ **Self-hosted and Matomo Cloud**: the container URL is resolved for you.
- 🧩 **Typed composables** for events, goals, custom dimensions, custom variables, site search and the data layer.
- ⚙️ **Environment variables**: every option can be overridden at runtime with `NUXT_PUBLIC_MATOMO_*`.

## Quick setup

Install the module ([Nuxt Scripts](https://scripts.nuxt.com) comes with it and is registered for you):

```bash
npm install @openmost/nuxt-matomo
```

Then add it to your modules with your Matomo URL and container id:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@openmost/nuxt-matomo'],
  matomo: {
    host: 'https://matomo.example.com',
    containerId: 'aBcD1234',
  },
})
```

That's it: the container loads on every page, and a `page_view` event is pushed on every navigation. Follow [Configure your container](#configure-your-container) once in Matomo so those page views are tracked.

## Options

| Option          | Env var                              | Default         | Description                                                                                  |
|-----------------|--------------------------------------|-----------------|----------------------------------------------------------------------------------------------|
| `host`          | `NUXT_PUBLIC_MATOMO_HOST`            | none            | Your Matomo URL, e.g. `https://matomo.example.com` or `https://example.matomo.cloud`.         |
| `containerId`   | `NUXT_PUBLIC_MATOMO_CONTAINER_ID`    | none            | Your Tag Manager container id (*Tag Manager → Install code*).                                |
| `trigger`       | `NUXT_PUBLIC_MATOMO_TRIGGER`         | `'onNuxtReady'` | When the container loads: `'onNuxtReady'`, `'client'` (as soon as possible) or `'manual'`.    |
| `dataLayerName` | `NUXT_PUBLIC_MATOMO_DATA_LAYER_NAME` | `'dataLayer'`   | The queue `useDataLayerPush` and the `page_view` event write to (`'dataLayer'` or `'_mtm'`). |
| `pageViewEvent` | none                                 | `true`          | Push a `page_view` event to the data layer on every page.                                    |

Environment variables override `nuxt.config` at runtime, so one build can target several environments:

```dotenv
NUXT_PUBLIC_MATOMO_HOST=https://matomo.example.com
NUXT_PUBLIC_MATOMO_CONTAINER_ID=aBcD1234
```

### Container URL

The container URL is built for you:

| `host`                         | Container URL                                                        |
|--------------------------------|----------------------------------------------------------------------|
| `https://matomo.example.com`   | `https://matomo.example.com/js/container_<id>.js`                    |
| `https://example.matomo.cloud` | `https://cdn.matomo.cloud/example.matomo.cloud/container_<id>.js`    |

If your *Install code* shows another URL (for example a custom domain on Matomo Cloud), copy it into `src`:

```ts
useScriptMatomoTagManager({
  src: 'https://cdn.example.com/container_aBcD1234.js',
})
```

## Configure your container

Matomo Tag Manager's default *Page view* trigger only fires on the first page load. The module pushes a `page_view` event on every navigation instead, once the destination page has rendered its title:

```js
dataLayer.push({
  event: 'page_view',
  page_url: '/about',         // route fullPath
  referrer_url: '/',          // previous route fullPath ('' on the first page)
  page_title: 'About us',     // document.title, after useHead / useSeoMeta
})
```

In your Matomo Tag Manager container:

1. **Read the data layer.** Either enable **Synchronize with GTM Data Layer events** in the container settings (default `dataLayerName: 'dataLayer'`), or set `dataLayerName: '_mtm'` to push directly into Matomo's own queue.
2. **Create two Data-Layer variables:** `DLV - page_url` (name `page_url`) and `DLV - page_title` (name `page_title`).
3. **Create a Custom Event trigger** `CE - page_view` with the event name `page_view`.
4. **Edit your Matomo Analytics tag:** set *Custom Page URL* to `{{DLV - page_url}}`, *Custom Page Title* to `{{DLV - page_title}}`, and replace its *Page view* trigger with `CE - page_view` so each page is tracked once.
5. **Publish** a new container version.

## Consent

Set `trigger: 'manual'` so the container never loads on its own, then load it when the visitor accepts:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@openmost/nuxt-matomo'],
  matomo: {
    host: 'https://matomo.example.com',
    containerId: 'aBcD1234',
    trigger: 'manual',
  },
})
```

```vue
<script setup lang="ts">
const { load, status } = useScriptMatomoTagManager()
</script>

<template>
  <button v-if="status !== 'loaded'" @click="load()">
    Accept analytics
  </button>
</template>
```

Commands pushed to `_mtm` and `_paq` before consent stay queued and are processed once the container loads.

## Composables

All composables are auto-imported and safe to call during SSR (they do nothing on the server).

### `useScriptMatomoTagManager`

The [Nuxt Scripts](https://scripts.nuxt.com/docs/api/use-script) instance of your container. Without arguments, it returns the container registered by the module.

```ts
const { status, load, proxy } = useScriptMatomoTagManager()

// Push to Matomo Tag Manager's queue, even before the container has loaded
proxy._mtm.push({ event: 'newsletter_signup' })
```

### `useDataLayerPush`

Pushes any payload to the configured data layer (`window.dataLayer` by default).

```ts
useDataLayerPush({ event: 'cta_click', label: 'hero' })
```

### `useMatomoEvent`

[Tracks an event](https://matomo.org/guide/reports/event-tracking/). The 5th argument holds optional custom dimensions.

```ts
useMatomoEvent('Category', 'Action', 'event_name', 23, { dimension1: 'Some value' })
```

### `useMatomoGoal`

Converts a goal, with an optional revenue.

```ts
useMatomoGoal(4)
useMatomoGoal(4, 49.9)
```

### `useMatomoCustomDimension`

Sets a [custom dimension](https://matomo.org/guide/reporting-tools/custom-dimensions/) value.

```ts
useMatomoCustomDimension(1, 'premium')
```

### `useMatomoCustomVariable`

Sets a custom variable, scoped to the `'page'` (default) or the `'visit'`.

```ts
useMatomoCustomVariable(1, 'plan', 'pro', 'visit')
```

### `useMatomoSearch`

Tracks an [internal site search](https://developer.matomo.org/api-reference/tracking-javascript#internal-search-tracking): keyword, category (or `false`) and result count.

```ts
useMatomoSearch(query.value, 'docs', results.value.length)
```

> `useMatomoEvent`, `useMatomoGoal`, `useMatomoCustomDimension`, `useMatomoCustomVariable` and `useMatomoSearch` push to `window._paq`, which is read by the *Matomo Analytics* tag of your container.

## Upgrade from v2

- Nuxt 4.1 or later is required.
- The container is now loaded by Nuxt Scripts, once the app is ready (`trigger: 'onNuxtReady'`). Set `trigger: 'client'` to load it as early as v2 did.
- The `page_view` event payload is unchanged. Set `pageViewEvent: false` to disable it.
- `runtimeConfig.public.matomo` and the `NUXT_PUBLIC_MATOMO_*` env vars keep working.

## Contributing

```bash
npm install
npm run dev:prepare   # generate type stubs
npm run dev           # start the playground on http://localhost:3000
npm run lint
npm run test
npm run test:types
```

The playground serves a fake container from `playground/public/js`, so you can try every feature without a Matomo instance.

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@openmost/nuxt-matomo/latest.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-version-href]: https://npmjs.com/package/@openmost/nuxt-matomo

[npm-downloads-src]: https://img.shields.io/npm/dm/@openmost/nuxt-matomo.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-downloads-href]: https://npmjs.com/package/@openmost/nuxt-matomo

[license-src]: https://img.shields.io/npm/l/@openmost/nuxt-matomo.svg?style=flat&colorA=18181B&colorB=28CF8D

[license-href]: https://npmjs.com/package/@openmost/nuxt-matomo

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js

[nuxt-href]: https://nuxt.com
