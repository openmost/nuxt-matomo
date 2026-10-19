import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders the index page', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')
    expect(html).toContain('<div>basic</div>')
  })

  it('does not inject the container during SSR', async () => {
    // The container is loaded client-side by Nuxt Scripts (default trigger: `onNuxtReady`).
    const html = await $fetch<string>('/')
    expect(html).not.toContain('container_test.js')
  })
})
