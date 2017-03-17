const path = require('path');

module.exports = {
    plugin: path.resolve(__dirname, 'bootstrap.js'),
    vendor: ['bootstrap-vue']
};
