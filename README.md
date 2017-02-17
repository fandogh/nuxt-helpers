# Nuxt Helpers
[![npm](https://img.shields.io/npm/v/nuxt-helpers.svg)]() 
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> I have collected a set of common useful vue plugins into this package, which can be used individually.

## Features
- Fully SSR compatible
- Tested on designed for using with Nuxt.js
- Can be used individually so bundle size remains small

## Getting started

```bash
npm install nuxt-helpers
# OR
yarn add nuxt-helpers
```

# Table of contents
- [Axios](#axios)
- [Bootstrap](#bootstrap)
- [Notifications(Toasts)](#notifications)
- [Auth Store](#auth-store) 

# Axios
This plugin is a wrapper around [axios](https://github.com/mzabriskie/axios). It tries to resolve and make easier lot's of ajax tasks specially with SSR.
So you can use **$get('profile')** instead of `(await Axios.get('http://server/api/profile')).data`.
 
- Uses optionally custom URL when executing requests in server-side.
- Handles all HTTP exceptions and prevents server side unhandled promise exceptions.
- Injects `$get`,`$post`,... into vue context instances so requests can be done out-of-the-box.
- Exposes `set_token` function so we can easily and globally set authentication tokens.
- Returns empty object if request fails.
- Throws *nuxt-friendly* exceptions if needed.

**Usage**

Add this to your `nuxt.config.js`:
```js
{
build: {
    vendor:[
        'nuxt-helpers/plugins/axios',
    ]
}
plugins: [
    'node_modules/nuxt-helpers/plugins/axios',    
]
}
```

```js
import {$get} from 'nuxt-helpers/plugins/axios';

async data() {
    let {profile} = await $get('profile');
    return {profile}
}
```

Or In any other function: (This does not needs importing axios plugin)

```js
mounted() {
    let {profile} = await this.$get('this');
    return {profile}
}
```

**Customization**

Customization can be done using shared environment variables.

Environment variable | Default                 | Description
---------------------|-------------------------|--------------------------------------------
API_URL   (SSR)      | http://localhost:3000   | Base url for ajax requests in server-side
API_URL   (browser)  | [nothing]               | Base url for ajax requests in client (cannot be changed, use API_PREFIX)
API_PREFIX           | /api                    | Adds this prefix before all relative urls

**Notes**

- Also see [hapi-nuxt](https://github.com/fandogh/hapi-nuxt) which is compatible with with plugin.
- More usage examples and bundles (including docker+nginx) comming soon.

# Bootstrap
With bootstrap-vue you can easily use standard bootstrap 4 components with your app [More info](https://github.com/bootstrap-vue/bootstrap-vue).
(you need to add bootstrap package in your package.json too)

**Usage**

Add this to your `nuxt.config.js`:
```js
{
    build: {
        vendor:[
            'nuxt-helpers/plugins/bootstrap',
        ]
    },
    plugins: [
        'node_modules/nuxt-helpers/plugins/bootstrap',    
    ]
    css: [
        path.resolve(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css'),
    ]
}
```

```vue
    <template>
        <b-alert show>
            Hello Bootstrap!
        </b-alert>
    </template>
```

# Notifications
Easy toasts for your app powered by [vue-notifications](https://github.com/se-panfilov/vue-notifications) and
[mini-toastr](https://github.com/se-panfilov/mini-toastr).

**Usage**

Add this to your `nuxt.config.js`:
```js
build: {
    vendor:[
        'nuxt-helpers/plugins/notifications',
    ]
}
plugins: [
    'node_modules/nuxt-helpers/plugins/notifications',    
]
```

Then you can define notification in your routes or components:

```js
export default {
   methods:{
     async login() {
         try {
             await this.$post('auth/login');
             this.success();
         } catch(e){
             this.error();
         }
     }  
   },
   notifications: {
            success: {
                title: 'Welcome :)',
                type: 'success'
            },
            error: {
                title: 'Error while authenticating',
                type: 'error'
            }
    },

}
```

# Auth Store
Forget about writing boring auth store for your next nuxt project!
Please note that this store is written to be used with standard [bak](https://github.com/fandogh/bak) routes. 
More options & customization will be added in the future.

**Usage**

`store/auth.js`:

```js
import AuthStore from 'nuxt-helpers/store/auth';

const authStore = new AuthStore({});

// Your customizations

export default authStore;
```

# Contributions
Any contribution or new plugin is highly welcomed :)

# License
MIT