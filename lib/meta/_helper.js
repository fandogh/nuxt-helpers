function meta(nuxt) {
    if (!nuxt.head.meta) {
        nuxt.head.meta = [];
    }

    nuxt.head.meta.push({charset: 'utf-8'});
    nuxt.head.meta.push({name: 'viewport', content: 'width=device-width, initial-scale=1'});
}

module.exports = {
    extend: meta
};
