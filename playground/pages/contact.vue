<template>
  <div class="page contact">
    <header class="page-header">
      <h1>Contact</h1>
      <p class="lede">
        Dummy form — none of these fields are submitted anywhere. The point
        of this page is just to make a <code>page_view</code> event fire
        with <code>page_title = "Contact · nuxt-matomo playground"</code>.
      </p>
    </header>

    <form
      class="form"
      @submit.prevent="onSubmit"
    >
      <label>
        <span>Name</span>
        <input
          v-model="name"
          type="text"
          placeholder="Ada Lovelace"
          required
        >
      </label>
      <label>
        <span>Email</span>
        <input
          v-model="email"
          type="email"
          placeholder="ada@example.com"
          required
        >
      </label>
      <label>
        <span>Message</span>
        <textarea
          v-model="message"
          rows="5"
          placeholder="Hello!"
          required
        />
      </label>
      <button
        type="submit"
        class="btn primary"
      >
        Send
      </button>
      <p
        v-if="submitted"
        class="confirmation"
      >
        Thanks — and a <code>useMatomoEvent('Contact', 'submit')</code> event
        was just pushed to <code>_paq</code>.
      </p>
    </form>

    <footer class="page-nav">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>
      <NuxtLink to="/composables">Composables</NuxtLink>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMatomoEvent, useSeoMeta } from '#imports'

useSeoMeta({
  title: 'Contact · nuxt-matomo playground',
  description: 'Demo contact page for the @openmost/nuxt-matomo module.',
})

const name = ref('')
const email = ref('')
const message = ref('')
const submitted = ref(false)

function onSubmit() {
  useMatomoEvent('Contact', 'submit', email.value || 'anonymous')
  submitted.value = true
}
</script>

<style scoped>
.page {
  font-family: ui-sans-serif, system-ui, sans-serif;
  max-width: 620px;
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
  max-width: 520px;
  margin: 0 auto;
  color: #4b5563;
}

.form {
  display: grid;
  gap: 0.9rem;
  margin: 2rem 0;
}

.form label {
  display: grid;
  gap: 0.3rem;
  font-size: 0.92rem;
  color: #374151;
}

.form input,
.form textarea {
  font: inherit;
  padding: 0.55rem 0.7rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #fff;
}

.form input:focus,
.form textarea:focus {
  outline: 2px solid #2563eb;
  outline-offset: 1px;
  border-color: transparent;
}

.btn {
  display: inline-block;
  padding: 0.6rem 1.1rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  border: 0;
}

.btn.primary {
  background: #2563eb;
  color: white;
}

.btn.primary:hover {
  background: #1d4ed8;
}

.confirmation {
  margin: 0;
  padding: 0.6rem 0.8rem;
  background: #ecfdf5;
  border: 1px solid #bbf7d0;
  color: #065f46;
  border-radius: 6px;
  font-size: 0.9rem;
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
