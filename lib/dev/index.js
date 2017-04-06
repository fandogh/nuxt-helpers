module.exports = {
    extend(nuxt) {
        if (nuxt.dev !== true && nuxt.dev !== false) {
            nuxt.dev = process.env.NODE_ENV !== 'production';
        }
    }
};
