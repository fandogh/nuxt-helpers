const webpack = require('webpack');
const path = require('path');

module.exports = {
    extend(nuxt) {
        nuxt.build.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
    },
    vendor: ['mement']
};
