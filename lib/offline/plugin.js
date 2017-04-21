const OfflinePluginRuntime = require('offline-plugin/runtime');

log('Detected');

window.onNuxtReady(() => {
    OfflinePluginRuntime.install({
        onInstalled() {
            log('installed');
        },
        onUpdating() {
            log('updating');
        },
        onUpdateReady() {
            log('ready');
            OfflinePluginRuntime.applyUpdate();
        },
        onUpdated() {
            log('updated');
            window.location.reload();
        }
    });
});

function log(msg) {
    console.log('[SW] ', msg); // eslint-disable-line no-console
}
