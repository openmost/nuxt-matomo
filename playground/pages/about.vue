<template>
  <div>
    <h1>About</h1>
    <NuxtLink to="/">Home</NuxtLink>
  </div>
</template>

<script setup>
import { useSeoMeta } from '#imports'

useSeoMeta({
  title: 'About us',
})
</script>
