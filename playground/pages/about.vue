<template>
  <div class="page about">
    <header class="page-header">
      <h1>About this playground</h1>
      <p class="lede">
        A minimal demo app to exercise every feature of
        <code>@openmost/nuxt-matomo</code> without touching a real Matomo
        instance. Open the devtools, watch <code>window.dataLayer</code>
        and <code>window._paq</code> as you click around.
      </p>
    </header>

    <section class="cards">
      <article>
        <h2>What gets pushed?</h2>
        <p>
          On every route change the module deferred-pushes a single
          <code>page_view</code> event after the destination page has
          mounted and its title has been hydrated by
          <code>useSeoMeta</code> / <code>useHead</code>:
        </p>
        <pre>{
  event: 'page_view',
  page_url: '/about',
  referrer_url: '/',
  page_title: 'About · nuxt-matomo playground',
}</pre>
      </article>

      <article>
        <h2>Why a custom event trigger?</h2>
        <p>
          Matomo Tag Manager's default <em>Page view</em> trigger doesn't
          fire on SPA navigations. Instead of duct-taping a
          <em>History change</em> trigger, this module emits a
          <code>page_view</code> custom event you can wire to a
          <code>CE - page_view</code> trigger in your container.
        </p>
      </article>

      <article>
        <h2>Where to start?</h2>
        <p>
          Head over to the <NuxtLink to="/composables">Composables playground</NuxtLink>
          to fire each composable manually, or jump between
          <NuxtLink to="/">Home</NuxtLink>,
          <NuxtLink to="/contact">Contact</NuxtLink>
          and this page to watch the automatic <code>page_view</code> events.
        </p>
      </article>
    </section>

    <footer class="page-nav">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/contact">Contact</NuxtLink>
      <NuxtLink to="/composables">Composables</NuxtLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports'

useSeoMeta({
  title: 'About · nuxt-matomo playground',
  description: 'About the @openmost/nuxt-matomo playground app.',
})
</script>

<style scoped>
.page {
  font-family: ui-sans-serif, system-ui, sans-serif;
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  line-height: 1.55;
  color: #1f2933;
}

.page-header {
  text-align: center;
  padding: 1rem 0 1.5rem;
  border-bottom: 1px solid #ececec;
}

.page-header h1 {
  font-size: 2rem;
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
}

.lede {
  max-width: 580px;
  margin: 0 auto;
  color: #4b5563;
}

.cards {
  display: grid;
  gap: 1rem;
  margin: 2rem 0;
}

.cards article {
  background: #fafafa;
  border: 1px solid #ececec;
  border-radius: 10px;
  padding: 1rem 1.25rem;
}

.cards h2 {
  margin: 0 0 0.4rem;
  font-size: 1.1rem;
  color: #2563eb;
}

pre {
  background: #1e1e1e;
  color: #f5f5f5;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  overflow: auto;
  font-size: 0.85rem;
  margin: 0.75rem 0 0;
}

.page-nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1px solid #ececec;
}

code {
  background: #f1f5f9;
  padding: 0.05rem 0.35rem;
  border-radius: 4px;
  font-size: 0.88em;
}
</style>
