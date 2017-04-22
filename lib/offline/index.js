const _ = require('lodash');

const defaults = {
    ServiceWorker: {
        cacheName: process.env.npm_package_name, // Allows having multiply services in same domain
        events: true
    }
};

module.exports = {
    ssr: false,
    plugin: nuxt => useOffline(nuxt),
    extend(nuxt) {
        if (useOffline(nuxt)) {
            console.log('Using offline plugin');
            nuxt.offline = _.defaultsDeep({}, nuxt.offline, defaults);
        }
    }
};

function useOffline(nuxt) {
    return nuxt.offline !== false && !nuxt.dev;
}
