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
    extendBuild() {
        // Modernize SSR bundle with less transforms
        // TODO
    }
};
