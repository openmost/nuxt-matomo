import { defineNuxtPlugin } from '#app'
import {useRuntimeConfig} from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const options = nuxtApp.$config.public.matomo

    console.log('CONFIG', options)
  }
})
