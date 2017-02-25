const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

const optimize = require('./plugins/optimize');
const dev = require('./plugins/dev');
const meta = require('./plugins/meta');

const _modules = {

    axios: {
        vendor: ['axios'],
        plugin: path.resolve(__dirname, 'plugins/axios'),
    },

    bootstrap: {
        vendor: ['bootstrap-vue'],
        plugin: path.resolve(__dirname, 'plugins/bootstrap'),
    },

    meta: {
        extend: meta
    },

    dev: {
        extend: dev
    },

    notifications: {
        vendor: ['vue-notifications', 'mini-toastr'],
        plugin: path.resolve(__dirname, 'plugins/notifications'),
    },

    auth: {
        vendor: ['cookie', 'js-cookie'],
        plugin: path.resolve(__dirname, 'plugins/auth'),
    },

    optimize: {
        extend: optimize
    }

};

function install(modules, nuxt) {

    if (!nuxt) {
        return;
    }

    if (modules === '*') {
        modules = Object.keys(_modules);
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

    if (!nuxt.head) {
        nuxt.head = {};
    }

    modules.forEach(function (m) {
        _install(m, nuxt);
    });

    return nuxt;
}

function _install(module_name, nuxt) {
    const module = _modules[module_name];

    if (!module) {
        console.warn('[Nuxt-Helpers] Module ' + module_name + ' not defined!');
    }

    if (module.vendor) {
        nuxt.build.vendor = _.uniq(nuxt.build.vendor.concat(module.vendor));
    }

    if (module.plugin) {
        nuxt.plugins.push(module.plugin);
        nuxt.plugins = _.uniq(nuxt.plugins);
    }

    if (module.extend) {
        module.extend(nuxt);
    }
}

module.exports = install;