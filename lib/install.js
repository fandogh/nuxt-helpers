const path = require('path');
const _ = require('lodash');
const chalk = require('chalk');

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
        const warns = install(m, nuxt);
        if (warns.length) {
            console.log(chalk.yellow("[Nuxt Helpers] Warns in helper " + chalk.red(m) + ':'));
            warns.forEach(warn => {
                console.log("   - " + chalk.yellow(warn));
            });
            process.exit(0);
        }
    });

    return nuxt;
}

function install(helperName, nuxt) {
    const modulePath = path.resolve(__dirname, helperName, '_helper.js');
    let helper;
    const warns = [];

    try {
        /* eslint-disable import/no-dynamic-require */
        helper = require(modulePath);
    } catch (err) {
        console.error(err);
    }

    if (!helper) {
        warns.push('Cannot load helper', helperName);
        return warns;
    }

    if (helper.vendor) {
        nuxt.build.vendor = _.uniq(nuxt.build.vendor.concat(helper.vendor));

        // Check helper vendors to be installed
        helper.vendor.forEach(vendor => {
            try {
                require(vendor);
            } catch (e) {
                warns.push('Dependency not installed: ' + chalk.blue(vendor));
            }
        });
    }

    if (helper.plugin) {
        nuxt.plugins.push(helper.plugin);
        nuxt.plugins = _.uniq(nuxt.plugins);
    }

    if (helper.extend) {
        helper.extend(nuxt);
    }

    return warns;
}

module.exports = wrap;
