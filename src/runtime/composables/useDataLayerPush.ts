import { useRuntimeConfig } from '#imports'

export function useDataLayerPush(args: Record<string, unknown>) {
  if (!import.meta.client) return

  const name = useRuntimeConfig().public.matomo?.dataLayerName || 'dataLayer'
  const target = window as unknown as Record<string, unknown[] | undefined>
  target[name] = target[name] || []
  target[name]!.push(args)
}
