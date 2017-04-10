const chalk = require('chalk');

function printURL(title, url, prefix) {
    console.log(chalk.bgMagenta.black(` ${title} `) + chalk.magenta(` ${url}${prefix}`) + '\r\n');
}

module.exports = {
    extend(nuxt) {
        // API URL
        nuxt.env.API_URL = process.env.API_URL || process.env.npm_package_config_nuxt_api_url || 'http://localhost:3000';

        // API URL for Browser
        nuxt.env.API_URL_BROWSER = process.env.API_URL_BROWSER || process.env.npm_package_config_nuxt_api_url_browser || nuxt.env.API_URL;

        // Common API Prefix
        nuxt.env.API_PREFIX = process.env.API_PREFIX || process.env.npm_package_config_nuxt_api_prefix || '/api';

        printURL('API URL', nuxt.env.API_URL, nuxt.env.API_PREFIX);

        if (process.env.API_URL_BROWSER && process.env.API_URL_BROWSER.length > 0) {
            printURL('API URL (Browser)', nuxt.env.API_URL_BROWSER, nuxt.env.API_PREFIX);
        }
    },
    plugin: true,
    vendor: ['axios']
};
