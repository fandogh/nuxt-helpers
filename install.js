const path = require('path');
const _ = require('lodash');

function wrap(helpers, nuxt) {
    if (!nuxt) {
        return;
    }

    if (!Array.isArray(helpers)) {
        helpers = [helpers];
    }

    if (!nuxt.build) {
        nuxt.build = {};
    }

    if (!nuxt.build.vendor) {
        nuxt.build.vendor = [];
    }

    if (!nuxt.css) {
        nuxt.css = [];
    }

    if (!nuxt.plugins) {
        nuxt.plugins = [];
    }

    if (!nuxt.head) {
        nuxt.head = {};
    }

    helpers.forEach(function (m) {
        install(m, nuxt);
    });

    return nuxt;
}

function install(helper_name, nuxt) {
    const module_path = path.resolve(__dirname, 'lib', helper_name, '_helper.js');
    var helper;

    try {
        /* eslint-disable import/no-dynamic-require */
        helper = require(module_path);
    } catch (e) {
        console.error(e);
    }

    if (!helper) {
        console.warn('[Nuxt Helpers] Invalid Helper', helper_name);
        return;
    }

    if (helper.vendor) {
        nuxt.build.vendor = _.uniq(nuxt.build.vendor.concat(helper.vendor));
    }

    if (helper.plugin) {
        nuxt.plugins.push(helper.plugin);
        nuxt.plugins = _.uniq(nuxt.plugins);
    }

    if (helper.extend) {
        helper.extend(nuxt);
    }
}

module.exports = wrap;
