export default function useMatomoGoal(goalId) {
  if (process.client) {
    window._paq = window._paq || []
    window._paq.push(['trackGoal', goalId])
  }
}
