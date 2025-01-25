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
pnpm add -D @openmost/nuxt-matomo

# Using yarn
yarn add --dev @openmost/nuxt-matomo

# Using npm
npm install --save-dev @openmost/nuxt-matomo
```

2. Add `@openmost/nuxt-matomo` to the `modules` section of `nuxt.config.ts`

```javascript
export default defineNuxtConfig({
  modules: [
    '@openmost/nuxt-matomo'
  ]
})
```

3. Register config in the `matomo` section to your `nuxt.config.ts`:

```javascript
runtimeConfig: {
  public: {
    matomo: {
      host: 'https://matomo.example.com',
      containerId: 'xxxxxxxx',
    },
  },
}
```

4. You can override values with `.env` file:
```
NUXT_PUBLIC_MATOMO_HOST=https://matomo.example.com
NUXT_PUBLIC_MATOMO_CONTAINER_ID=xxxxxxxx
```

5. Update your Matomo page view tag configuration

As [SPA doesn't work with Matomo Tag Manager](https://developer.matomo.org/guides/spa-tracking) by default, you have to add a second trigger to your Matomo tag in the Tag Manager UI.

- Look at your Matomo Tag Manager container configuration
- Edit Matomo Analytics tag, and add a new "History change" trigger.
- Ensure that your tag has now both "Page view" AND "History change" triggers.
- Don't forget to publish a new version of your container!

## Default `dataLayer` on every pages

On every pages, the default `dataLayer` object is generated with this structure :

```javascript
dataLayer.push({
  event: 'page_view',
  page_url: '/', //example value
  referrer_url: '/previous' //example value
})
```

## Useful composables

This module allow you to use some helpful composables, here is the list :

### Add data to your `dataLayer` with the `useDataLayerPush` composable

The `useDataLayerPush()` composable allow you to easely push data to the `dataLayer` array.

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

### Support custom variables with the `useMatomoCustomVariables` composable

The `useMatomoCustomVariables()` composable allow you to send data to your custom variables.

```html

<template>
  <button @click="onClick">Click me</button>
</template>

<script setup>
  function onClick() {
    useMatomoCustomVariables(1, 'variable name', 'variable value', 'page') 
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
