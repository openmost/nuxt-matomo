# Matomo for Nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Quick Setup

1. Add `@openmost/nuxt-matomo` dependency to your project

```bash
# Using pnpm
pnpm add @openmost/nuxt-matomo

# Using yarn
yarn add @openmost/nuxt-matomo

# Using npm
npm install @openmost/nuxt-matomo
```

2. Add `@openmost/nuxt-matomo` to the `modules` section of `nuxt.config.ts`

```javascript
export default defineNuxtConfig({
  modules: [
    '@openmost/nuxt-matomo'
  ]
})
```

3. Configure the module. Either pass options in `nuxt.config.ts` under the `matomo` key:

```ts
export default defineNuxtConfig({
  modules: ['@openmost/nuxt-matomo'],
  matomo: {
    host: 'https://matomo.example.com',
    containerId: 'xxxxxxxx',
    // Optional. Defaults to 'dataLayer' (GTM-style queue).
    // Set to '_mtm' to push directly into Matomo's own queue.
    dataLayerName: 'dataLayer',
  },
})
```

…or via `runtimeConfig.public.matomo`, which lets you override per environment:

```ts
export default defineNuxtConfig({
  modules: ['@openmost/nuxt-matomo'],
  runtimeConfig: {
    public: {
      matomo: {
        host: 'https://matomo.example.com',
        containerId: 'xxxxxxxx',
        dataLayerName: 'dataLayer',
      },
    },
  },
})
```

If both are set, `runtimeConfig` (and the env vars below) win.

| Option           | Module key      | Runtime config key                       | Env var                                 | Default       |
|------------------|-----------------|------------------------------------------|-----------------------------------------|---------------|
| Matomo URL       | `host`          | `runtimeConfig.public.matomo.host`        | `NUXT_PUBLIC_MATOMO_HOST`               | —             |
| MTM container id | `containerId`   | `runtimeConfig.public.matomo.containerId` | `NUXT_PUBLIC_MATOMO_CONTAINER_ID`       | —             |
| dataLayer name   | `dataLayerName` | `runtimeConfig.public.matomo.dataLayerName` | `NUXT_PUBLIC_MATOMO_DATA_LAYER_NAME` | `dataLayer`   |

4. You can override values from a `.env` file:

```
NUXT_PUBLIC_MATOMO_HOST=https://matomo.example.com
NUXT_PUBLIC_MATOMO_CONTAINER_ID=xxxxxxxx
# Optional: write to Matomo's native queue instead of GTM's dataLayer
# NUXT_PUBLIC_MATOMO_DATA_LAYER_NAME=_mtm
```

5. Configure your Matomo Tag Manager container to track SPA page views

This module fixes [SPA tracking with Matomo Tag Manager](https://developer.matomo.org/guides/spa-tracking) by emitting a `page_view` custom event into the `dataLayer` on every route change, with the new page's URL and title already resolved. You then wire your Matomo Analytics tag to read those values from the `dataLayer` and trigger on that custom event.

In your Matomo Tag Manager container:

1. **Enable GTM `dataLayer` synchronization on the container**
   - Open your container's settings (*Admin → Container → Edit*).
   - Turn on the **"Synchronize with GTM Data Layer events"** option (also labelled *"Sync events from the GTM Data Layer"* depending on your Matomo version).
   - This is required because `useDataLayerPush` (and the automatic `page_view` push) writes to the standard GTM `window.dataLayer` array. Without this option, Matomo Tag Manager listens to its own `_mtm` queue only and will never see the events emitted by this module.
2. **Create a Data Layer Variable named `DLV - page_url`**
   - Type: *Data-Layer Variable*
   - Data Layer Variable Name: `page_url`
3. **Create a Data Layer Variable named `DLV - page_title`**
   - Type: *Data-Layer Variable*
   - Data Layer Variable Name: `page_title`
4. **Create a Custom Event trigger named `CE - page_view`**
   - Type: *Custom Event*
   - Event Name: `page_view`
5. **Edit your Matomo Analytics tag**
   - Set the *Custom Page URL* field to `{{DLV - page_url}}`
   - Set the *Custom Page Title* field to `{{DLV - page_title}}`
   - Set the trigger to `CE - page_view` (replace any default *Page view* trigger so the tag fires once per SPA navigation, not twice).
6. **Publish a new version of your container.**

## Default push on every page

On every route change, the module pushes the following object into the configured queue (`window.dataLayer` by default, or whatever you set `dataLayerName` to):

```javascript
dataLayer.push({
  event: 'page_view',
  page_url: '/',                 // example value — current route fullPath
  referrer_url: '/previous',     // example value — previous route fullPath
  page_title: 'My page title',   // example value — document.title once resolved
})
```

The push is deferred until after the new page has mounted and `useSeoMeta` / `useHead` has flushed the title to the document, so `page_title` always reflects the destination page.

### Choosing the queue (`dataLayer` vs `_mtm`)

- `dataLayer` *(default)* — the GTM-style array. Use this with the **"Synchronize with GTM Data Layer events"** option enabled in your Matomo Tag Manager container, so MTM relays each push to its own queue. This is the recommended setup for sites that already have other GTM-style tooling.
- `_mtm` — Matomo Tag Manager's native queue. Use this when you don't want to enable the GTM sync option (or you don't have a `dataLayer` at all). MTM picks events up directly without any extra container setting.

Switch via `dataLayerName: '_mtm'` in `nuxt.config.ts` or `NUXT_PUBLIC_MATOMO_DATA_LAYER_NAME=_mtm` in your `.env`.

## Useful composables

This module allow you to use some helpful composables, here is the list :

### Add data to your `dataLayer` with the `useDataLayerPush` composable

The `useDataLayerPush()` composable pushes any payload to the configured queue (defaults to `window.dataLayer`, or whatever you set `dataLayerName` to — e.g. `_mtm`).

```html
<template>
  <button @click="onClick">Click me</button>
</template>

<script setup>
function onClick(){
  useDataLayerPush({
    event: 'some_event',
    foo: 'bar',
  })
}
</script>
```

### Send events with the `useMatomoEvent` composable

The `useMatomoEvent()` composable allow you to send events to Matomo directly from your components.

It also handle custom dimension as 5th parameter (optional).

```html
<template>
  <button @click="onClick">Click me</button>
</template>

<script setup>
function onClick(){
  useMatomoEvent('Category', 'Action', 'event_name', 23, {dimension1: 'Some value'})
}
</script>
```

### Convert goals with the `useMatomoGoal` composable

The `useMatomoGoal()` composable allow you to convert goals from your components.

```html
<template>
  <button @click="onClick">Click me</button>
</template>

<script setup>
function onClick(){
  useMatomoGoal(4) // 4 is the goal ID
}
</script>
```


### Handle custom dimensions with the `useMatomoCustomDimension` composable

The `useMatomoCustomDimension()` composable allow you to send data to your custom dimensions.

```html

<template>
  <button @click="onClick">Click me</button>
</template>

<script setup>
  function onClick() {
    useMatomoCustomDimension(1, 'My custom value') // 1 is the custom dimension ID
  }
</script>
```

### Support custom variables with the `useMatomoCustomVariable` composable

The `useMatomoCustomVariable()` composable allow you to send data to your custom variables.

```html

<template>
  <button @click="onClick">Click me</button>
</template>

<script setup>
  function onClick() {
    useMatomoCustomVariable(1, 'variable name', 'variable value', 'page') 
  }
</script>
```

### Track site search with the `useMatomoSearch` composable

The `useMatomoSearch()` composable wraps Matomo's [`trackSiteSearch`](https://developer.matomo.org/api-reference/tracking-javascript#internal-search-tracking) API to log internal-search queries from your components.

```html
<template>
  <form @submit.prevent="onSearch">
    <input v-model="query" type="search">
    <button type="submit">Search</button>
  </form>
</template>

<script setup>
const query = ref('')
const results = ref([])

async function onSearch() {
  results.value = await $fetch('/api/search', { params: { q: query.value } })
  // keyword, category (or false), result count
  useMatomoSearch(query.value, 'docs', results.value.length)
}
</script>
```

Enjoy !

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@openmost/nuxt-matomo/latest.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-version-href]: https://npmjs.com/package/@openmost/nuxt-matomo

[npm-downloads-src]: https://img.shields.io/npm/dm/@openmost/nuxt-matomo.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-downloads-href]: https://npmjs.com/package/@openmost/nuxt-matomo

[license-src]: https://img.shields.io/npm/l/@openmost/nuxt-matomo.svg?style=flat&colorA=18181B&colorB=28CF8D

[license-href]: https://npmjs.com/package/@openmost/nuxt-matomo

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js

[nuxt-href]: https://nuxt.com
