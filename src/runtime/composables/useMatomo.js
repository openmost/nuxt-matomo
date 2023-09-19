export default function () {

  var _paq = window._paq = window._paq || [];

  function trackPageView(title, url) {
    _paq.push(['setCustomUrl', url]);
    _paq.push(['setDocumentTitle', title]);
    _paq.push(['trackPageView']);
  }

  function trackEvent(category, action, name, value, dimension) {
    _paq.push(['trackEvent', category, action, name, value, dimension]);
  }

  function trackGoal(goalId) {
    _paq.push(['trackGoal', goalId]);
  }

  function setCustomDimension(customDimensionId, customDimensionValue) {
    _paq.push(['setCustomDimension', customDimensionId, customDimensionValue]);
  }

  function deleteCustomDimension(customDimensionId) {
    _paq.push(['deleteCustomDimension', customDimensionId]);
  }

  function setCustomVariable(index, name, value, scope) {
    _paq.push(['setCustomVariable', index, name, value, scope]);
  }

  function deleteCustomVariables(scope) {
    _paq.push(['deleteCustomDimension', scope]);
  }

  function setReferrerUrl(referrerUrl) {
    _paq.push(['setReferrerUrl', referrerUrl]);
  }

  function trackSiteSearch(keyword, category, resultsCount, dimension) {
    _paq.push(['trackSiteSearch', keyword, category, resultsCount, dimension]);
  }

  function trackLink(url, linkType, dimension) {
    _paq.push(['trackLink', url, linkType, dimension]);
  }

  function setUserId(userId) {
    _paq.push(['setUserId', userId]);
  }

  function resetUserId() {
    _paq.push(['resetUserId']);
    _paq.push(['appendToTrackingUrl', 'new_visit=1']);
    _paq.push(['trackPageView']);
    _paq.push(['appendToTrackingUrl', '']);
  }

  function trackContentImpressionWithinNode(domNode, contentTarget) {
    _paq.push(['trackContentImpressionsWithinNode', domNode, contentTarget]);
  }

  function trackContentInteractionNode(domNode, contentInteraction) {
    _paq.push(['trackContentInteractionNode', domNode, contentInteraction]);
  }

  function trackContentImpression(contentName, contentPiece, contentTarget) {
    _paq.push(['trackContentImpression', contentName, contentPiece, contentTarget]);
  }

  function trackContentInteraction(contentInteraction, contentName, contentPiece, contentTarget) {
    _paq.push(['trackContentInteraction', contentInteraction, contentName, contentPiece, contentTarget]);
  }

  return {
    trackPageView,
    trackEvent,
    trackGoal,
    setCustomDimension,
    deleteCustomDimension,
    setCustomVariable,
    deleteCustomVariables,
    setReferrerUrl,
    trackSiteSearch,
    trackLink,
    setUserId,
    resetUserId,
    trackContentImpressionWithinNode,
    trackContentInteractionNode,
    trackContentImpression,
    trackContentInteraction,
  }
}
