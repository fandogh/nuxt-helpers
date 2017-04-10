import * as OfflinePluginRuntime from 'offline-plugin/runtime';

OfflinePluginRuntime.install();

const TAG = '[SW] ';

window.onNuxtReady(() => {
    if ('serviceWorker' in navigator) {
        if (navigator.serviceWorker.controller) {
            // SW Already registered
        } else {
            navigator.serviceWorker.register('/sw.js').then(() => {
                console.log(TAG + ' Loaded');
            }).catch(err => {
                console.error(TAG, err);
            });
        }
    } else if (window.applicationCache) {
        // Register app cache code
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = '/appcache/manifest.html';
        document.body.appendChild(iframe);
    }
});
