# Nuxt Helpers
[![npm](https://img.shields.io/npm/v/nuxt-helpers.svg)]()
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> Collection of useful and SSR compatible vue plugins for using with [nuxt.js](https://github.com/nuxt/nuxt.js)

**BREAKING CHANGES: If you are migrating from <= 0.7.0 version, please see [migration guide](#migration-guide)** 

## Features
- Fully SSR compatible.
- Tested and well designed for using with Nuxt.js.
- Plugins can be used individually so bundle size remains small.
- Easy nuxt installation

## Getting started

1- Install nuxt-helpers package:
```bash
# YARN
yarn add nuxt-helpers

# NPM
npm install nuxt-helpers

```

2- Change your `nuxt.config.js`:

```js
const NuxtHelpers = require('nuxt-helpers');

module.exports = NuxtHelpers([
    //'auth',
    //'axios',
    //'bootstrap',
    //'dev',
    //'meta',
    //'toast',
    //'optimize',
    //'font-awesome'
], {

    // Your nuxt config

})
```

**3- Add `.nuxt-helpers` to your `.gitignore` file**

## Available modules
- [axios](#axios)
- [bootstrap](#bootstrap)
- [toast](#toast)
- [auth](#auth-store)
- [font-awesome](#font-awesome)
- meta
- dev
- optimize

### Axios
This plugin is a wrapper around [axios](https://github.com/mzabriskie/axios). It tries to resolve and make easier lot's of ajax tasks specially with SSR.
So you can use **$get('profile')** instead of `(await Axios.get('http://server/api/profile')).data`.

- Uses optionally custom URL when executing requests in server-side.
- Handles all HTTP exceptions and prevents server side unhandled promise exceptions.
- Injects `$get`,`$post`,... into vue context instances so requests can be done out-of-the-box.
- Exposes `setToken` function so we can easily and globally set authentication tokens.
- Returns empty object if request fails.
- Throws *nuxt-friendly* exceptions if needed.

**💡 Usage**

- Add `axios` to project `package.json`
- Add `axios` helper

```js
import {$get} from '~/nuxt-helpers/axios';

async data() {
    let {profile} = await $get('profile');
    return {profile}
}
```

Or In any other function: (This does not needs importing axios plugin)

```js
mounted() {
    let {profile} = await this.$get('profile');
    return {profile}
}
```

**Customization**

Customization can be done using shared environment variables.

Environment variable | Default                 | Description
---------------------|-------------------------|--------------------------------------------
API_URL              | http://localhost:3000   | Base url for ajax requests in server-side
API_URL_BROWSER      | [API_URL]               | Base url for ajax requests in client-side
API_PREFIX           | /api                    | Adds this prefix before all relative urls

### Bootstrap
With [bootstrap-vue](https://github.com/bootstrap-vue/bootstrap-vue) you can easily use standard bootstrap 4 components with your app.
(you need to add bootstrap package in your package.json too)

**💡 Usage**

- Add `bootstrap-vue` to `package.json`
- Add `bootstrap-vue` helper

```vue
<template>
    <b-alert show>
        Hello Bootstrap!
    </b-alert>
</template>
```

### Toast
Easy toasts for your app using [mini-toastr](https://github.com/se-panfilov/mini-toastr).

**💡 Usage**

- Add `mini-toastr` to package.json
- Add `toast` helper

Then you can define notification in your routes or components:

```js
export default {
   methods:{
     async login() {
         try {
             await this.$post('auth/login');
             this.$success('Welcome :)');
         } catch(e){
             this.$error('Error while authenticating');
         }
     }  
   }
}
```

### Auth Store

**💡 Usage**

- Add `cookie` & `js-cookie` to package.json
- Add `auth` helper

```js
// store/auth.js

import AuthStore from '~/.nuxt-helpers/auth';

const authStore = new AuthStore({ /*opts*/ });

// Your customizations

export default authStore;
```

**Options**
- **default_user** : Default fields for `state.auth.user`. (overrides using Object.assign when logged-in).
- **token_cookie** : Token cookie opts. (see [js-cookie docs](https://github.com/js-cookie/js-cookie) for more info)

### Font Awesome
Leverage [Font Awesome](http://fontawesome.io/) the iconic font and CSS toolkit.

**💡 Usage**

- Add `font-awesome` to package.json
- Add `font-awesome` helper

### Optimize
**This helper is not stable yet.**

**💡 Usage**
 
- Add `cssnano` to package.json
- Add `optimize` helper

## Migration guide

- Plugins are now copied to project root to prevent babel problems.
- Add `.nuxt-helpers` to `.gitignore`. 
- See new `axios` and `auth` usage description.
- `bootstrap` plugin is renamed to `bootstrap-vue`.
- `notifications` plugin is renamed to `toast` and usage simplified.

# Contributions
Any contribution,bug report or component is highly welcomed :)

**Contributors**

- [Pooya Parsa](https://github.com/pi0)
- [Isi Robayna](https://github.com/irobayna)

# License
[MIT License](https://github.com/fandogh/nuxt-helpers/blob/master/LICENSE) - Fandogh 2017
