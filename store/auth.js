/**
 * User store
 * Keeps logged-in user's state
 */

import Cookie from 'cookie';
import Cookies from 'js-cookie';
import {setToken, $get, $post} from '../plugins/axios';

const inBrowser = typeof window !== 'undefined';
const ctx = global.__VUE_SSR_CONTEXT__;

function AuthStore({default_user} = {}) {
    let self = this;

    // ----------------------------------------
    // Default State
    // ----------------------------------------
    this.defaultState = {
        user: Object.assign({roles: [], name: null}, default_user),
        loggedIn: false,
        token: null
    };

    // ----------------------------------------
    // State
    // ----------------------------------------
    this.state = Object.assign({}, self.defaultState);

    // ----------------------------------------
    // Getters
    // ----------------------------------------
    this.getters = {};

    // ----------------------------------------
    // Mutations
    // ----------------------------------------
    this.mutations = {

        setUser: function (state, user) {
            // Fill user with defaults data
            state.user = Object.assign({}, self.defaultState.user, user);

            // Set actual loggedIn status
            state.loggedIn = Boolean(user);
        },

        setToken: function (state, token) {
            state.token = token;

            // Setup axios
            setToken(token);

            // Store token in cookies
            if (inBrowser) {
                Cookies.set('token', token);
            }
        }

    };

    // ----------------------------------------
    // Actions
    // ----------------------------------------
    this.actions = {

        loadToken: function ({commit}) {
            // Try to extract token from cookies
            let cookieStr = inBrowser ? document.cookie : ctx.req.headers.cookie;
            let cookies = Cookie.parse(cookieStr || '') || {};
            let token = cookies.token;

            commit('setToken', token);
        },

        fetch: function ({commit, dispatch, state}) {
            // Load user token
            dispatch('loadToken');

            // No token
            if (!state.token) {
                return;
            }

            // Get user profile
            return $get('/auth/user').then(function ({user}) {
                commit('setUser', user);
            }).catch(() => {
                return dispatch('logout')
            });
        },

        login: function ({commit, dispatch}, fields) {
            return $post('/auth/login', fields).then(function ({id_token}) {
                commit('setToken', id_token);
                return dispatch('fetch');
            });
        },

        logout: function ({commit}) {
            // Unset token
            commit('setToken', null);

            // Unload user profile
            commit('setUser', null);

            // Server side logout
            return $get('/auth/logout').catch(function () {
            });
        }
    };
}

export default AuthStore;

