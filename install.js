const path = require('path');
const webpack = require('webpack');

const _modules = {

    axios: {
        vendor: ['axios'],
        plugin: path.resolve(__dirname, 'plugins/axios'),
    },

    bootstrap: {
        vendor: ['bootstrap-vue'],
        plugin: path.resolve(__dirname, 'plugins/bootstrap'),
    },

    meta: {
        extend: function (nuxt) {
            if (!nuxt.head.meta) {
                nuxt.head.meta = [];
            }

            nuxt.head.meta.push({charset: 'utf-8'});
            nuxt.head.meta.push({name: 'viewport', content: 'width=device-width, initial-scale=1'});
        }
    },

    dev: {
        extend: function (nuxt) {
            if (nuxt.dev !== true && nuxt.dev !== false) {
                nuxt.dev = process.env.NODE_ENV !== 'production';
            }
        }
    },

    notifications: {
        vendor: ['vue-notifications', 'mini-toastr'],
        plugin: path.resolve(__dirname, 'plugins/notifications'),
    },

    auth: {
        vendor: ['cookie', 'js-cookie'],
        plugin: path.resolve(__dirname, 'store/auth'),
    },

    optimize: {
        extend: function (nuxt) {

            // Better filenames
            if (!nuxt.build.filenames) {
                nuxt.build.filenames = {
                    css: 'app.css',
                    vendor: 'vendor.js',
                    app: 'app.js'
                };
            }

            const _extend = nuxt.build.extend;

            nuxt.build.extend = function (config, ctx) {
                if (!ctx.isServer) {
                    // Legacy (IE) Browsers support
                    config.entry.vendor.push('babel-polyfill');
                    return;
                }

                // Smaller SSR bundle size
                config.externals = unique(config.externals.concat(nuxt.build.vendor));

                // Don't load stylesheets inside ssr bundle
                ['scss', 'css'].forEach(function (ext) {
                    config.module.rules[0].query.loaders[ext] = 'ignore-loader';
                });

                // nuxt-helpers it self is not external (it should not be shared across sessions)
                var index = config.externals.indexOf('nuxt-helpers');
                if (index >= 0) {
                    config.externals.splice(index, 1);
                }

                // Call original extend
                if (_extend) {
                    _extend(config, ctx);
                }
            }
        }
    }

};

function unique(arr) {
    return arr.filter(function (value, index) {
        return arr.indexOf(value) === index;
    });
}

function install(modules, nuxt) {

    if (!nuxt) {
        return;
    }

    if (modules === '*') {
        modules = Object.keys(_modules);
    }

    if (!Array.isArray(modules)) {
        modules = [modules];
    }

    if (!nuxt.build) {
        nuxt.build = {};
    }

    if (!nuxt.build.vendor) {
        nuxt.build.vendor = [];
    }

    if (!nuxt.plugins) {
        nuxt.plugins = [];
    }

    if (!nuxt.head) {
        nuxt.head = {};
    }

    modules.forEach(function (m) {
        _install(m, nuxt);
    });

    return nuxt;
}

function _install(module_name, nuxt) {
    const module = _modules[module_name];

    if (!module) {
        console.warn('[Nuxt-Helpers] Module ' + module_name + ' not defined!');
    }

    if (module.vendor) {
        nuxt.build.vendor = unique(nuxt.build.vendor.concat(module.vendor));
    }

    if (module.plugin) {
        nuxt.plugins.push(module.plugin);
        nuxt.plugins = unique(nuxt.plugins);
    }

    if (module.extend) {
        module.extend(nuxt);
    }
}

module.exports = install;