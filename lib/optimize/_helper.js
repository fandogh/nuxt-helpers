const _ = require('lodash');

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
        // Client Bundle
        if (ctx.isClient) {
            // Legacy (IE) Browsers support
            config.entry.vendor.push('babel-polyfill');
            return;
        }

        // Smaller SSR bundle size
        config.externals = _.uniq(config.externals.concat(nuxt.build.vendor));

        // Don't load stylesheets inside ssr bundle
        ['scss', 'css'].forEach(function (ext) {
            config.module.rules[0].query.loaders[ext] = 'ignore-loader';
        });

        // Modernize SSR bundle with less transforms
        /* eslint-disable camelcase */
        const babel_query = {
            plugins: [
                'transform-es2015-spread',
                'transform-object-rest-spread'
            ]
        };

        // ...VUE
        config.module.rules[0] = _.cloneDeep(config.module.rules[0]);
        config.module.rules[0].query.loaders.js = 'babel-loader?' + JSON.stringify(babel_query);

        // ...JS
        config.module.rules[1] = _.cloneDeep(config.module.rules[1]);
        config.module.rules[1].query.plugins = babel_query.plugins;
        config.module.rules[1].query.presets = [];

        // nuxt-helpers itself is not external (it should not be shared across sessions)
        var index = config.externals.indexOf('nuxt-helpers');
        if (index >= 0) {
            config.externals.splice(index, 1);
        }

        // Call original extend
        if (_extend) {
            _extend(config, ctx);
        }
    };
}

module.exports = {
    extend: optimize,
    vendor: ['ignore-loader']
};
