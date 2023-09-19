<template>
  <div>
    <h1>Home</h1>
    {{ config.public }}
  </div>
</template>

<script setup>
import {useRuntimeConfig} from "nuxt/app";

const config = useRuntimeConfig();
</script>
