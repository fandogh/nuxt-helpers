const path = require('path');
const fs = require('fs-extra');
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

    if (!nuxt.env) {
        nuxt.env = {};
    }

    // Explicit rootDir and srcDir
    nuxt.rootDir = nuxt.rootDir || path.resolve('');
    nuxt.srcDir = nuxt.srcDir || nuxt.rootDir;

    // Cleanup & ensure .nuxt-helpers dir exits
    nuxt.nuxtHelpersDir = path.resolve(nuxt.rootDir, '.nuxt-helpers');
    fs.mkdirsSync(nuxt.nuxtHelpersDir);

    // Install helpers
    helpers.forEach(m => {
        const warns = install(m, nuxt);
        if (warns.length > 0) {
            console.log(chalk.yellow(`[Nuxt Helpers] ${m}:`));
            warns.forEach(warn => {
                console.log(`   - ${chalk.yellow(warn)}`);
            });
        }
    });

    // Ensure uniques after helpers install
    nuxt.plugins = _.uniq(nuxt.plugins);
    nuxt.build.vendor = _.uniq(nuxt.build.vendor);

    return nuxt;
}

function install(helperName, nuxt) {
    const modulePath = path.resolve(__dirname, helperName);
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
        nuxt.build.vendor = nuxt.build.vendor.concat(helper.vendor);

        // Check helper vendors to be installed
        helper.vendor.forEach(vendor => {
            try {
                require(vendor);
            } catch (err) {
                warns.push('Dependency not installed: ' + chalk.blue(vendor));
            }
        });
    }

    if (helper.plugin) {
        let plugin = helper.plugin;

        // Resolve plugin path
        if (plugin === true) {
            plugin = path.resolve(modulePath, 'plugin.js');
        }

        // Copy plugin to project
        const filename = helperName + '.js';
        const dst = path.resolve(nuxt.nuxtHelpersDir, filename);
        fs.copySync(plugin, dst);

        if (helper.copyOnly !== false) {
            nuxt.plugins.push({src: dst, ssr: (helper.ssr !== false)});
        }
    }

    if (helper.extend) {
        helper.extend(nuxt);
    }

    if (helper.extendBuild) {
        const _extend = nuxt.build.extend;
        nuxt.build.extend = function () {
            helper.extendBuild.apply(this, arguments);
            if (_extend) {
                _extend.apply(this, arguments);
            }
        };
    }

    return warns;
}

module.exports = wrap;
