<template>
  <div>
    <h1>Home</h1>
    <NuxtLink to="/contact">Contact</NuxtLink>
    <NuxtLink to="/about">About</NuxtLink>
  </div>
</template>

<script setup>
import { useSeoMeta } from '#imports'

useSeoMeta({
  title: 'Home page',
  description: 'Description text',
})
</script>
