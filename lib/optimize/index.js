const _ = require('lodash');
const cssnano = require('cssnano');

module.exports = {
    extend(nuxt) {
        // Better filenames
        if (!nuxt.build.filenames) {
            nuxt.build.filenames = {
                css: 'app.css',
                vendor: 'vendor.js',
                app: 'app.js'
            };
        }

        // Better Public path
        if (!nuxt.build.publicPath) {
            nuxt.build.publicPath = '/assets/';
        }

        // Add cssnano
        if (!nuxt.build.postcss) {
            nuxt.build.postcss = [];
        }
        nuxt.build.postcss.push(cssnano(nuxt.build.cssnano));
    },
    extendBuild(config, {isClient}) {
        // Modernize SSR bundle with less transforms
        /* eslint-disable camelcase */
        // const babel_query = {
        //     plugins: [
        //         'transform-es2015-spread',
        //         'transform-object-rest-spread'
        //     ]
        // };
        //
        // // ...VUE
        // config.module.rules[0] = _.cloneDeep(config.module.rules[0]);
        // config.module.rules[0].query.loaders.js = 'babel-loader?' + JSON.stringify(babel_query);
        //
        // // ...JS
        // config.module.rules[1] = _.cloneDeep(config.module.rules[1]);
        // config.module.rules[1].query.plugins = babel_query.plugins;
        // config.module.rules[1].query.presets = [];

    },
};
