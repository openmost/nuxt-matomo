export default function useDataLayerPush(args) {
  if (process.client) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(args)
  }
}
