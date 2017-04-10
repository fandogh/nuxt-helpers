module.exports = {
    vendor: ['offline-plugin'],
    ssr: false,
    plugin: nuxt => (nuxt.offline === true) || (nuxt.offline !== false && process.env.NODE_ENV === 'production')
};
