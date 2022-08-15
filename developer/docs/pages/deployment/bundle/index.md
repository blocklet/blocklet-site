---
title: 将 Blocklet 打包
description: 将 Blocklet 打包
layout: documentation
---

> <p style={{color:"red"}}>TODO: this page should be updated</p>

Blocklets needs to be bundled before they can deployed to a running Blocklet Server instance. Blocklet bundling is very similar to bundling a typical web application, here are the steps to bundle your javascript blocklets.

### Bundle the frontend

If your blocklet is built with front-end framework such as React.js, Vue.js, you must bundle them to static files that can be served from a webserver.

#### 1. Get Blocklet DID

Go to your blocklet folder and run `blocklet meta | grep did` to get the blocklet did:

```shell
blocklet meta | grep did
did:         z8iZn18zGRm5veEdhmrS2FRrUyw5ZAQcewVMH
```

#### 2. Change asset path

For apps bootstrapped with `create-react-app`, you can use the following build script to bundle the frontend:

```json
"build:client": "PUBLIC_URL=\"/z8iZn18zGRm5veEdhmrS2FRrUyw5ZAQcewVMH\" react-scripts build",
```

Please remember to replace the blocklet did with yours.

#### 3. Load assets with `%PUBLIC_URL%`

Please change your `public/index.html` to load all assets with `%PUBLIC_URL%` prefix, just like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <!--
  manifest.json provides metadata used when your web app is installed on a
  user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
-->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
  Notice the use of %PUBLIC_URL% in the tags above.
  It will be replaced with the URL of the `public` folder during the build.
  Only files inside the `public` folder can be referenced from the HTML.

  Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
  work correctly both with client-side routing and a non-root public URL.
  Learn how to configure a non-root public URL by running `npm run build`.
-->
    <link rel="stylesheet" type="text/css" href="%PUBLIC_URL%/icons/css/all.css" />
    <script src="%PUBLIC_URL%/api/session/env"></script>
    <title>Blockchain Manager</title>
  </head>

  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
  This HTML file is a template.
  If you open it directly in the browser, you will see an empty page.

  You can add webfonts, meta tags, or analytics to this file.
  The build step will place the bundled scripts into the <body> tag.

  To begin the development, run `npm start` or `yarn start`.
  To create a production bundle, use `npm run build` or `yarn build`.
-->
  </body>
</html>
```

#### 4. Inject the blocklet meta script

Then add a script tag in the head to load blocklet meta:

```html
<script src="__meta__.js"></script>
```

This script will load from any path the blocklet is mounted, the content of the script will be similar to:

```javascript
window.blocklet = {
  did: 'z8ia4e5vAeDsQEE2P26bQqz9oWR1Lxg9qUMaV',
  name: 'static-demo-blocklet',
  version: '0.9.0',
  prefix: '/admin/static-demo-blocklet/',
};
```

#### 5. Update client side router

If you are using a client side router, set router base dynamically is required to make things work correctly:

```jsx
<Router basename={window.blocklet ? window.blocklet.prefix : window.env.apiPrefix}>
  <WrappedApp />
</Router>
```

### 6. Adapt Ajax requests

If you are using some ajax request library such as axios, please make following changes:

```javascript
import axios from 'axios';

axios.defaults.baseURL = '';
axios.defaults.timeout = 200000;

axios.interceptors.request.use((config) => {
  const prefix = window.blocklet ? window.blocklet.prefix : window.env.apiPrefix;
  config.baseURL = prefix || '';

  return config;
});
```

### Bundle the backend

Use the following script to bundle the backend:

```json
"build:server": "DEBUG=@abtnode/* NODE_ENV=production blocklet bundle -w api/webpack.blocklet.js",
```

Since we are using webpack internally to bundle the blocklet backend, you can customize the configuration:

```js
export default (webpack) => {
  return {
    optimization: {
      nodeEnv: false, // @link https://github.com/webpack/webpack/issues/7470#issuecomment-394259698
    },
    plugins: [
      new webpack.DefinePlugin({
        '_process.env.NODE_ENV': JSON.stringify(_process.env.NODE_ENV || 'development'),
      }),
    ],
  };
};
```
