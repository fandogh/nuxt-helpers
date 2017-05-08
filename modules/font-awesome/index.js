const path = require('path');

module.exports = {
    extend(config) {
        let fa = 'node_modules/font-awesome/css/font-awesome.css';
        if (config.rootDir) {
            fa = path.resolve(config.rootDir, fa);
        }
        config.css.push(fa);
    },
    vendor: ['font-awesome']
};
