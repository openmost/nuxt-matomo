import {defineNuxtPlugin} from "#imports"

export default defineNuxtPlugin((nuxtApp) => {

  if (process.client) {
    const options = nuxtApp.$config.public.matomo;

    /**
     * Matomo tracking code
     */
    if (options.host && options.idSite) {

      var _paq = window._paq = window._paq || [];
      _paq.push(["setExcludedQueryParams", ["\/.*\/"]]);

      /**
       * NUXT router support
       */
      _paq.push(['setCustomUrl', to.fullPath]);
      _paq.push(['setDocumentTitle', document.title]);

      /**
       * Matomo JS Tracker Options
       */
      if (options.setCookiePath) {
        _paq.push(['setCookiePath', options.setCookiePath]);
      }

      if (options.setCookieDomain) {
        _paq.push(['setCookieDomain', options.setCookieDomain]);
      }

      if (options.setDomains) {
        _paq.push(['setDomains', options.setDomains]);
      }

      if (options.setLinkClasses) {
        _paq.push(['setLinkClasses', options.setLinkClasses]);
      }

      if (options.setDownloadExtensions) {
        _paq.push(['setDownloadExtensions', options.setDownloadExtensions]);
      }

      if (options.addDownloadExtensions) {
        _paq.push(['addDownloadExtensions', options.addDownloadExtensions]);
      }

      if (options.removeDownloadExtensions) {
        _paq.push(['removeDownloadExtensions', options.removeDownloadExtensions]);
      }

      if (options.setDownloadClasses) {
        _paq.push(['setDownloadClasses', options.setDownloadClasses]);
      }

      if (options.setLinkTrackingTimer) {
        _paq.push(['setLinkTrackingTimer', options.setLinkTrackingTimerDelay ?? 500]);
      }

      if (options.setIgnoreClasses) {
        _paq.push(['setIgnoreClasses', options.setIgnoreClasses]);
      }

      if (options.requireConsent) {
        _paq.push(['requireConsent']);
      }

      if (options.requireCookieConsent) {
        _paq.push(['requireCookieConsent']);
      }

      if (options.trackPageView) {
        _paq.push(['trackPageView']);
      }

      if (options.enableLinkTracking) {
        _paq.push(['enableLinkTracking']);
      }

      if (options.enableHeartBeatTimer) {
        _paq.push(['enableHeartBeatTimer', options.heartBeatTimerActiveTime]);
      }

      if (options.trackAllContentImpression) {
        _paq.push(['trackAllContentImpressions']);
      }

      if (options.trackVisibleContentImpressions) {
        _paq.push(['trackVisibleContentImpressions', options.contentImpressionsCheckOnScroll, options.contentImpressionInterval]);
      }

      (function () {
        var u = options.host + '/';
        _paq.push(['setTrackerUrl', u + 'matomo.php']);
        _paq.push(['setSiteId', options.idSite.toString()]);
        var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
        g.async = true;
        g.src = u + 'matomo.js';
        s.parentNode.insertBefore(g, s);
      })();
    }
  }

});
