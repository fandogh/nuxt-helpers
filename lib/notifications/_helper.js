const path = require('path');

module.exports = {
    plugin: path.resolve(__dirname, 'notifications.js'),
    vendor: ['vue-notifications', 'mini-toastr']
};
