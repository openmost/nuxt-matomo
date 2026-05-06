<template>
  <div>basic</div>
</template>

<script setup lang="ts">
// Reference every auto-imported composable from `#imports`. If the module
// stops registering any of these via `addImportsDir` (e.g. by reverting to
// `export default`), Nuxt's unimport step fails the build — which is the
// regression covered by GitHub issue #3.
import {
  useDataLayerPush,
  useMatomoCustomDimension,
  useMatomoCustomVariable,
  useMatomoEvent,
  useMatomoGoal,
  useMatomoSearch,
} from '#imports'

// Reference the composables so tree-shaking can't drop the imports.
defineExpose({
  useDataLayerPush,
  useMatomoCustomDimension,
  useMatomoCustomVariable,
  useMatomoEvent,
  useMatomoGoal,
  useMatomoSearch,
})
</script>
