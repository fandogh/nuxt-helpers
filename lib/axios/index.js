module.exports = {
    extend(nuxt) {
        nuxt.env.API_URL = process.env.API_URL || '';
        nuxt.env.API_PREFIX = process.env.API_PREFIX || '';
    },
    plugin: true,
    vendor: ['axios']
};
