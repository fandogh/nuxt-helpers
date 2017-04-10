const webpack = require('webpack');

module.exports = {
    extend(nuxt) {
        nuxt.build.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
    },
    vendor: ['mement']
};
