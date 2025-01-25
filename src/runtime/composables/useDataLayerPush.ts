export default function useDataLayerPush(args) {
  if (import.meta.client) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(args)
  }
}
