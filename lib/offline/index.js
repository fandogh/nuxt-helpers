const _ = require('lodash');
const path = require('path');

const defaults = {
    ServiceWorker: {
        cacheName: process.env.npm_package_name, // Allows having multiply services in same domain
        events: true,
    }
};

module.exports = {
    ssr: false,
    plugin: nuxt => useOffline(nuxt),
    extend(nuxt) {
        if (useOffline(nuxt)) {
            console.log("Enable offline plugin");
            nuxt.offline = _.defaultsDeep(defaults, nuxt.offline);
        }
    }
};

function useOffline(nuxt) {
    return nuxt.offline !== false && !nuxt.dev;
}