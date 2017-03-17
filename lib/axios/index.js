import Axios from 'axios';
import Vue from 'vue';

const inBrowser = typeof window !== 'undefined';

// When inBrowser proxy through current url to prevent all problems with CORS and security
const API_URL = inBrowser ? '' : (process.env.API_URL || 'http://localhost:3000');

// Create new axios instance
const axios = Axios.create({
    baseURL: API_URL + (process.env.API_PREFIX || '/api')
});

// Throw nice http errors & keep SSR safe
function onError(e) {
    if (!inBrowser) {
        return {};
    }

    var response = {};
    if (e.response) {
        response = e.response.data;
    }

    throw Object.assign({
        statusCode: 500,
        message: 'Request error'
    }, response);
}

// Wap promise
function wrapPromise(p) {
    return p.then(function (res) {
        return res.data || {};
    }).catch(onError);
}

// Create wrappers
// https://github.com/mzabriskie/axios#request-method-aliases
export const $request = function (opts) {
    return wrapPromise(axios.request(opts));
};

export const $get = function (url, opts) {
    return wrapPromise(axios.get(url, opts));
};

export const $delete = function (url, opts) {
    return wrapPromise(axios.delete(url, opts));
};

export const $head = function (url, opts) {
    return wrapPromise(axios.head(url, opts));
};

export const $post = function (url, data, opts) {
    return wrapPromise(axios.post(url, data, opts));
};

export const $put = function (url, data, opts) {
    return wrapPromise(axios.put(url, data, opts));
};
export const $patch = function (url, data, opts) {
    return wrapPromise(axios.patch(url, data, opts));
};

// ----------------------------------------
// Vue Plugin
// ----------------------------------------
const VueAxios = {
    install: function (Vue) {
        // Globally register as $http
        Vue.prototype.$http = axios;

        // Mixins
        Vue.mixin({
            methods: {
                $request: $request,
                $get: $get,
                $delete: $delete,
                $head: $head,
                $post: $post,
                $put: $put,
                $patch: $patch
            }
        });
    }

};

// ----------------------------------------
// Install vue plugin
// ----------------------------------------
Vue.use(VueAxios);

// ----------------------------------------
// setToken helper
// ----------------------------------------
export const setToken = function (token) {
    axios.defaults.headers.common.Authorization = token ? 'Bearer ' + token : null;
};
