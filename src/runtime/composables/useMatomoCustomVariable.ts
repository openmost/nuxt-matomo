export default function useMatomoGoal(index, name, value, scope = 'page') {
  if (process.client) {
    window._paq = window._paq || []
    window._paq.push(['setCustomVariable', index, name, value, scope])
  }
}
