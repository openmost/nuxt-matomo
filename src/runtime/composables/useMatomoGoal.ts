export default function useMatomoGoal(goalId) {
  if (import.meta.client) {
    window._paq = window._paq || []
    window._paq.push(['trackGoal', goalId])
  }
}
