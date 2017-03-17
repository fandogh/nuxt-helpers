const path = require('path');

module.exports = {
    plugin: path.resolve(__dirname, 'index.js'),
    vendor: ['axios']
};
