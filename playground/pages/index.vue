<template>
  <div>
    <h1>Home</h1>
  </div>
</template>

<script setup>
import {useSeoMeta, useHead} from "nuxt/app";
import useMatomo from "../../src/runtime/composables/useMatomo.js";

useHead({
  title: 'Home - head'
})

const {trackEvent} = useMatomo();

trackEvent('Test', 'haha', 'yolo', 1);
</script>
