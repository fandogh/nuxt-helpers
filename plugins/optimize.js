const unique = require('../helpers').unique;

function optimize(nuxt) {

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

module.exports = optimize;