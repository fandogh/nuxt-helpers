const unique = require('../helpers').unique;

// Prevent Nuxt.js bug which shares client & ssr rules
var r0 = null;
var r1 = null;

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

        if (ctx.isClient) {
            // Legacy (IE) Browsers support
            config.entry.vendor.push('babel-polyfill');
            if (r1) {
                config.module.rules[0].query.loaders = JSON.parse(r0);
                config.module.rules[1].query = JSON.parse(r1);
            }
        } else if (ctx.isServer) {
            if (!r1) {
                r0 = JSON.stringify(config.module.rules[0].query.loaders);
                r1 = JSON.stringify(config.module.rules[1].query);
            }
            // Smaller SSR bundle size
            config.externals = unique(config.externals.concat(nuxt.build.vendor));

            // Don't load stylesheets inside ssr bundle
            ['scss', 'css'].forEach(function (ext) {
                config.module.rules[0].query.loaders[ext] = 'ignore-loader';
            });

            // Modernize SSR bundle with less transforms
            const babel_query = {
                plugins: [
                    'transform-es2015-spread',
                    'transform-object-rest-spread'
                ]
            };

            // ...VUE
            config.module.rules[0].query.loaders.js = 'babel-loader?' + JSON.stringify(babel_query);

            // ...JS
            config.module.rules[1].query.plugins = babel_query.plugins;
            config.module.rules[1].query.presets = [];

            // nuxt-helpers itself is not external (it should not be shared across sessions)
            var index = config.externals.indexOf('nuxt-helpers');
            if (index >= 0) {
                config.externals.splice(index, 1);
            }
        }

        // Call original extend
        if (_extend) {
            _extend(config, ctx);
        }
    }
}

module.exports = optimize;