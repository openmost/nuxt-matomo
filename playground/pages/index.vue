<template>
  <div class="page home">
    <header class="hero">
      <span class="badge">@openmost/nuxt-matomo · playground</span>
      <h1>Matomo Tag Manager, with first-class SPA support</h1>
      <p class="lede">
        Drop-in Nuxt module that injects your Matomo Tag Manager container,
        emits a <code>page_view</code> custom event into the
        <code>dataLayer</code> on every route change, and ships a tiny set of
        composables for sending events, goals, dimensions and site searches.
      </p>
      <div class="cta">
        <NuxtLink
          to="/composables"
          class="btn primary"
        >
          Try the composables
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="btn ghost"
        >
          Learn more
        </NuxtLink>
      </div>
    </header>

    <section class="grid">
      <article>
        <h2>SPA-aware page views</h2>
        <p>
          Every <code>vue-router</code> navigation pushes a <code>page_view</code>
          event with the resolved <code>page_url</code>, <code>referrer_url</code>
          and (waited-for) <code>page_title</code>.
        </p>
      </article>
      <article>
        <h2>Composables, not magic</h2>
        <p>
          <code>useMatomoEvent</code>, <code>useMatomoGoal</code>,
          <code>useMatomoCustomDimension</code>,
          <code>useMatomoCustomVariable</code>,
          <code>useMatomoSearch</code> &amp; <code>useDataLayerPush</code>.
        </p>
      </article>
      <article>
        <h2>Configurable queue</h2>
        <p>
          By default we push to the GTM-style <code>window.dataLayer</code>.
          Set <code>NUXT_PUBLIC_MATOMO_DATA_LAYER_NAME=_mtm</code> to push
          straight into Matomo's own queue instead.
        </p>
      </article>
    </section>

    <footer class="page-nav">
      <NuxtLink to="/about">About</NuxtLink>
      <NuxtLink to="/contact">Contact</NuxtLink>
      <NuxtLink to="/composables">Composables</NuxtLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports'

useSeoMeta({
  title: 'Home · nuxt-matomo playground',
  description: 'Demo home page for the @openmost/nuxt-matomo module.',
})
</script>

<style scoped>
.page {
  font-family: ui-sans-serif, system-ui, sans-serif;
  max-width: 880px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  line-height: 1.55;
  color: #1f2933;
}

.hero {
  text-align: center;
  padding: 2.5rem 0 1.5rem;
  border-bottom: 1px solid #ececec;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: #eef6ff;
  color: #2563eb;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  margin-bottom: 1rem;
}

.hero h1 {
  font-size: 2.25rem;
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
}

.lede {
  max-width: 620px;
  margin: 0 auto;
  color: #4b5563;
}

.cta {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.btn {
  display: inline-block;
  padding: 0.6rem 1.1rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}

.btn.primary {
  background: #2563eb;
  color: white;
}

.btn.primary:hover {
  background: #1d4ed8;
}

.btn.ghost {
  border: 1px solid #cbd5e1;
  color: #1f2933;
}

.btn.ghost:hover {
  background: #f8fafc;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.grid article {
  background: #fafafa;
  border: 1px solid #ececec;
  border-radius: 10px;
  padding: 1rem 1.1rem;
}

.grid h2 {
  margin: 0 0 0.4rem;
  font-size: 1rem;
  color: #2563eb;
}

.grid p {
  margin: 0;
  font-size: 0.92rem;
  color: #4b5563;
  overflow-wrap: anywhere;
}

.grid code {
  word-break: break-word;
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
