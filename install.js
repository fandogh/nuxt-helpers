const path = require('path');

const modules = {

    axios: {
        vendor: ['axios'],
        main: path.resolve(__dirname, 'plugins/axios'),
    },

    bootstrap: {
        vendor: ['bootstrap-vue'],
        main: path.resolve(__dirname, 'plugins/bootstrap'),
    },

    notifications: {
        vendor: ['vue-notifications', 'mini-toastr'],
        main: path.resolve(__dirname, 'plugins/notifications'),
    },

    auth: {
        vendor: ['cookie', 'js-cookie'],
        main: path.resolve(__dirname, 'store/auth'),
    }

};

function unique(arr) {
    return arr.filter(function (value, index) {
        return arr.indexOf(value) === index;
    });
}

function install(modules, nuxt) {

    if (!nuxt) {
        return;
    }

    if (!Array.isArray(modules)) {
        modules = [modules];
    }

    if (!nuxt.build) {
        nuxt.build = {};
    }

    if (!nuxt.build.vendor) {
        nuxt.build.vendor = [];
    }

    if (!nuxt.plugins) {
        nuxt.plugins = [];
    }

    modules.forEach(function (m) {
        _install(m, nuxt);
    });

    return nuxt;
}

function _install(module_name, nuxt) {
    const module = modules[module_name];

    if (!module) {
        console.warn('[Nuxt-Helpers] Module ' + module_name + ' not defined!');
    }

    nuxt.build.vendor = unique(nuxt.build.vendor.concat(module.vendor));
    nuxt.plugins.push(module.main);
    nuxt.plugins = unique(nuxt.plugins);
}

module.exports = install;