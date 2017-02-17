import Vue from 'vue';

// https://github.com/se-panfilov/vue-notifications
// https://github.com/se-panfilov/mini-toastr

if (process.BROWSER_BUILD) {
    const VueNotifications = require('vue-notifications');
    const Toast = require('mini-toastr');
    Toast.init({});

    // Here we setup messages output to `mini-toastr`
    const toast = ({title, message, type, timeout, cb}) => Toast[type](message, title, timeout, cb);

    // Binding for methods .success(), .error() and etc. You can specify and map your own methods here.
    // Required to pipe our output to UI library (mini-toastr in example here)
    // All not-specified events (types) would be piped to output in console.
    const options = {
        success: toast,
        error: toast,
        info: toast,
        warn: toast
    };

    // Activate plugin
    // VueNotifications have auto install but if we want to specify options we've got to do it manually.
    Vue.use(VueNotifications, options);
}
