<template>
  <div>
    <h1>Home</h1>
    <NuxtLink to="/contact">Contact</NuxtLink>
    <NuxtLink to="/about">About</NuxtLink>

    <br>

    <button @click="onClick">
      TriggerEvent
    </button>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Home page',
  description: 'Description text',
})

function onClick() {
  useMatomoEvent('Test', 'Demo', 'Foo')
}
</script>
