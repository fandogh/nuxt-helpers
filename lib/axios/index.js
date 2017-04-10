const chalk = require('chalk');

function printURL(title, url, prefix) {
    console.log(chalk.bgMagenta.black(` ${title} `) + chalk.magenta(` ${url}${prefix}`) + '\r\n');
}

module.exports = {
    extend(nuxt) {
        // API URL
        const API_URL = process.env.API_URL =
            process.env.API_URL || process.env.npm_package_config_nuxt_api_url || 'http://localhost:3000';

        // API URL for Browser
        const API_URL_BROWSER = process.env.API_URL_BROWSER =
            process.env.API_URL_BROWSER || process.env.npm_package_config_nuxt_api_url_browser || API_URL;

        // Common API Prefix
        const API_PREFIX = process.env.API_PREFIX = nuxt.env.API_PREFIX =
            process.env.API_PREFIX || process.env.npm_package_config_nuxt_api_prefix || '/api';

        // Don't add env to production bundles
        if (process.env.NODE_ENV !== 'production') {
            nuxt.env.API_URL = API_URL;
            nuxt.env.API_URL_BROWSER = API_URL_BROWSER;
        }

        printURL('API URL', API_URL, API_PREFIX);

        if (API_URL_BROWSER && API_URL_BROWSER.length > 0) {
            printURL('API URL (Browser)', API_URL_BROWSER, API_PREFIX);
        }
    },
    plugin: true,
    vendor: ['axios']
};
