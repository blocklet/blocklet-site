---
title: Blocklet Component
description: Blocklet Component
layout: documentation
---

This article describes how to develop a Blocklet component. For how to develop a composite Blocklet, see [Creating a Composite Blocklet](/how-to/composite-blocklet)

## Develop a component

The way to develop a component is basically the same as [Develop an application](/how-to/develop), when developing a component, you need to add `--app-id` and optional `--mount-point` parameters to the `blocklet dev` command

`blocklet dev --app-id <blocklet-app-id> --mount-point /xxx`

`blocklet-app-id` can be viewed in the blocklet details page

## Component Mount Point

When a blocklet is composed, the blocklet will be mounted under the child path configured in the parent component.

Components need to support working under any mount point.

**Dynamically get the mount point of the component**

Front end: After importing [blocklet runtime information](/reference/blocklet-js), get the mount point of the component through `window.blocklet.prefix`

Backend: In a request, get the mount point of the component through the `x-path-prefix` in the request header.

```js
server.use((req, res) => {
  const mountPoint = req.headers['x-path-prefix'];
});
```

## Component API

The component does not need to add a mount point prefix to the API, because the client's request will go through the Blocklet Service first, and when the component receives the request, the prefix of the request has been removed

Example:

1. Component declaration API: `/api/foo`
2. Components are mounted under `/child`
3. The client requests `/child/api/foo`
4. The Blocklet Service forwards the request to the component and removes the prefix `/child`
5. The component receives the request `/api/foo`

## Load front-end static resources

Because the front-end page of the component will be loaded in a relative path (such as `/child1/index.html`), we need to support loading front-end static resources in a relative path.

When building the application, change the front-end static resource prefix of the application to `/.blocklet/proxy/<blocklet did>`

Example:

```bash
PUBLIC_URL='/.blocklet/proxy/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' npm run build
```

> You usually do not need to configure manually. When you create a Blocklet project with Create Blocklet, everything is already configured for you.

## Redirect

We need to support redirection of backend under relative path to work properly

```js
const prefix = req.headers['x-path-prefix'];

res.redirect(`${prefix}path/to`);
```

We need to support redirection of the front end under relative paths to work properly

```js
const prefix = window.blocklet.prefix;

window.location.href = `${prefix}path/to`;
```

## Distinguish components and applications

Back-end environment

```js
const { env, getWallet } = require('@blocklet/sdk');

// am I an app or a component
env.isComponent;

// appId, appName, appDescription, appUrl, mode of application and component are the same
env.appId;
env.appName;
env.appDescription;
env.appUrl;
env.mode;
const appWallet = getWallet();

// // The dataDir, cacheDir of the application and the component are different
env.dataDir;
env.cacheDir;
```

Front-end environment

```js
// am I an app or a component
window.blocklet.isComponent;

// my mount point
window.blocklet.prefix;

// my mount point
window.blocklet.prefix;

// application mount point (usually /)
window.blocklet.groupPrefix;

// mount points for other components in the application
window.blocklet.componentMountPoints;
```
