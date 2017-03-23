const path = require('path');

function fontAwesome(config) {
    var fa = 'node_modules/font-awesome/css/font-awesome.css';
    if (config.rootDir) {
        fa = path.resolve(config.rootDir, fa);
    }
    config.css.push(fa);
}

module.exports = {
    extend: fontAwesome,
    vendor: ['font-awesome']
};
