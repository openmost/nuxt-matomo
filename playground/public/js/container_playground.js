// Fake Matomo Tag Manager container used by the playground.
// Mirrors what a real container does: it drains `window._mtm` and marks itself loaded.
window.__playgroundContainer = { loadedAt: Date.now(), queueOnLoad: [...(window._mtm || [])] }
console.info('[playground] Matomo Tag Manager container loaded', window.__playgroundContainer)
