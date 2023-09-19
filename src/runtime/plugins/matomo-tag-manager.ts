import {defineNuxtPlugin} from "#imports"

export default defineNuxtPlugin((nuxtApp) => {

  if (process.client) {
    const options = nuxtApp.$config.public.matomo;

    /**
     * Matomo Tag Manager tracking code
     */
    if (options.host && options.idContainer) {

      /**
       * NUXT router support
       */
        // Build CDN url for Matomo Cloud
      let containerUrl = '';
      if (options.host.includes('.matomo.cloud')) {
        const host = options.host.replace('http://', '').replace('https://', '');
        containerUrl = `https://cdn.matomo.cloud/${host}/container_${options.idContainer}.js`
      } else {
        containerUrl = `${options.host}/js/container_${options.idContainer}.js`;
      }

      var _mtm = window._mtm = window._mtm || [];
      _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
      var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
      g.async = true;
      g.src = containerUrl;
      s.parentNode.insertBefore(g, s);
    }
  }

});
