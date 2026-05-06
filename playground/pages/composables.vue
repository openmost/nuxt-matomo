<template>
  <div class="composables-page">
    <header>
      <h1>Composables playground</h1>
      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </nav>
      <p>
        Click any button to call the matching composable. The bottom panel
        shows the live <code>window.dataLayer</code> and <code>window._paq</code>
        arrays so you can verify each push.
      </p>
    </header>

    <section>
      <h2>useDataLayerPush</h2>
      <p>Pushes an arbitrary payload to <code>window.dataLayer</code>.</p>
      <button
        type="button"
        @click="onDataLayerPush"
      >
        Push <code>{ event: 'cta_click', label: 'hero' }</code>
      </button>
    </section>

    <section>
      <h2>useMatomoEvent</h2>
      <p>Sends a <code>trackEvent</code> tuple to <code>_paq</code>.</p>
      <button
        type="button"
        @click="onMatomoEvent"
      >
        Track event <code>Category / Action / event_name (value 23)</code>
      </button>
    </section>

    <section>
      <h2>useMatomoGoal</h2>
      <p>Converts a goal by id.</p>
      <button
        type="button"
        @click="onMatomoGoal"
      >
        Track goal <code>4</code>
      </button>
    </section>

    <section>
      <h2>useMatomoCustomDimension</h2>
      <p>Sets a custom dimension value.</p>
      <button
        type="button"
        @click="onMatomoCustomDimension"
      >
        Set custom dimension <code>1 = "premium"</code>
      </button>
    </section>

    <section>
      <h2>useMatomoCustomVariable</h2>
      <p>Sets a custom variable on the page scope.</p>
      <button
        type="button"
        @click="onMatomoCustomVariable"
      >
        Set custom variable <code>1 = "plan / pro"</code>
      </button>
    </section>

    <section>
      <h2>useMatomoSearch</h2>
      <p>Tracks an internal site search via <code>trackSiteSearch</code>.</p>
      <button
        type="button"
        @click="onMatomoSearch"
      >
        Track search <code>"nuxt module" / docs / 12 results</code>
      </button>
    </section>

    <section class="state">
      <h2>Live state</h2>
      <button
        type="button"
        @click="refresh"
      >
        Refresh snapshot
      </button>
      <button
        type="button"
        @click="reset"
      >
        Reset arrays
      </button>

      <h3><code>window.dataLayer</code></h3>
      <pre>{{ dataLayer }}</pre>

      <h3><code>window._paq</code></h3>
      <pre>{{ paq }}</pre>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  useDataLayerPush,
  useMatomoCustomDimension,
  useMatomoCustomVariable,
  useMatomoEvent,
  useMatomoGoal,
  useMatomoSearch,
  useSeoMeta,
} from '#imports'

useSeoMeta({
  title: 'Composables playground',
})

const dataLayer = ref<unknown[]>([])
const paq = ref<unknown[]>([])

function refresh() {
  dataLayer.value = [...(window.dataLayer ?? [])]
  paq.value = [...(window._paq ?? [])]
}

function reset() {
  window.dataLayer = []
  window._paq = []
  refresh()
}

onMounted(refresh)

function onDataLayerPush() {
  useDataLayerPush({ event: 'cta_click', label: 'hero' })
  refresh()
}

function onMatomoEvent() {
  useMatomoEvent('Category', 'Action', 'event_name', 23, { 1: 'Some value' })
  refresh()
}

function onMatomoGoal() {
  useMatomoGoal(4)
  refresh()
}

function onMatomoCustomDimension() {
  useMatomoCustomDimension(1, 'premium')
  refresh()
}

function onMatomoCustomVariable() {
  useMatomoCustomVariable(1, 'plan', 'pro', 'page')
  refresh()
}

function onMatomoSearch() {
  useMatomoSearch('nuxt module', 'docs', 12)
  refresh()
}
</script>

<style scoped>
.composables-page {
  font-family: ui-sans-serif, system-ui, sans-serif;
  max-width: 720px;
  margin: 0 auto;
  padding: 1.5rem;
  line-height: 1.5;
}

nav {
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0 1rem;
}

section {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
}

section h2 {
  margin-top: 0;
}

button {
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border: 1px solid #888;
  border-radius: 6px;
  background: #f7f7f7;
  font-size: 0.95rem;
  margin-right: 0.5rem;
}

button:hover {
  background: #ececec;
}

.state pre {
  background: #1e1e1e;
  color: #f5f5f5;
  padding: 0.75rem;
  border-radius: 6px;
  overflow: auto;
  max-height: 240px;
  font-size: 0.85rem;
}

code {
  background: #f0f0f0;
  padding: 0.05rem 0.3rem;
  border-radius: 4px;
}
</style>
