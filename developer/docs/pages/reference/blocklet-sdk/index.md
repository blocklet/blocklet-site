---
title: Blocklet SDK
description: Blocklet SDK
layout: documentation
---

Blocklet SDK for blocklet developer

## Install

```shell
yarn add @blocklet/sdk
```

or

```shell
npm install @blocklet/sdk
```

## Wallet

```javascript
const { getWallet } = require('@blocklet/sdk');

// wallet is an instance of @ocap/wallet
const wallet = getWallet();
const { address, secretKey, publicKey } = wallet;
```

## Auth

### Get Client

```javascript
const { Auth } = require('@blocklet/sdk');

const client = new Auth();
```

### getUser

`client.getUser(did)`

Get user by user did

- _@param_ **did** `string`
- _@return_ `{ code, user }`

### getOwner

`client.getOwner()`

Get owner of the app

- _@param_ **did** `string`
- _@return_ `{ code, user }`

### getUsers

Get users of the app

#### By Default

```
client.getUsers();
client.getUsers({ paging: { page: 2 } });
client.getUsers({ query: { role: 'admin' } });
client.getUsers({ query: { approved: true } });
client.getUsers({ sort: { updatedAt: -1 } });
```

- _@param_ **paging** `Object`
  - **paging.pageSize** ``
  - **paging.page** `
  - > The value of pageSize cannot exceed 100
- _@param_ **query** `Object`
  - **query.role** `String` Match users by role name
    - `$none`: Match users which does not have a role
  - **query.approved** `Boolean` Match users by approved
  - **query.search** `String` Match users by did or fullName
- _@param_ **sort** `Object`
  - **sort.createdAt** `Number`
  - **sort.updatedAt** `Number`
  - **sort.lastLoginAt** `Number`
  - > `-1`: The latest time is at first. `1`: The latest time is at last.
  - > default sort is `{ createdAt: -1 }`
- _@return_ `{ code, users, paging }`

```
Paging {
  total: number of users
  pageSize: number of users per page
  pageCount: number of page
  page: current page number
}
```

#### By User DID

```
client.getUsers({ dids: ['did1', 'did2', ...] });
client.getUsers({ dids: ['did1', 'did2', ...], query: { approved: true } });
```

- _@param_ **Array\<string\>** `dids` The user did list
  - > The length of dids cannot exceed 100
- _@param_ **query** `Object`
  - **query.approved** `Boolean` Match users by approved
- _@return_ `{ code, users }`

Tips:

- If you don't pass the `dids` parameter, the API will run by default
- If you pass in a non-existing DID, the API **will not** report an error

### getPermissionsByRole

`client.getPermissionsByRole(role)`

Get all permissions of a role

- _@param_ **role** `string`
- _@return_ `{ code, permissions }`

### getRoles

`client.getRoles()`

Get all roles of the app

- _@return_ `{ code, roles }`

### createRole

`client.createRole({ name, title, description })`

- _@param_ **name** `string` the key of the role, should be unique
- _@param_ **title** `string`
- _@param_ **description** `string`
- _@return_ `{ code, role }`

### updateRole

`client.updateRole(name, { title, description })`

- _@param_ **name** `string` the key of the role
- _@param_ **title** `string`
- _@param_ **description** `string`
- _@return_ `{ code, role }`

### deleteRole

`client.deleteRole(name, { title, description })`

- _@param_ **name** `string` the key of the role
- _@return_ `{ code }`

### issuePassportToUser

`client.issuePassportToUser({ userDid, role })`

- _@param_ **userDid** `string`
- _@param_ **role** `string` the key of the role. e.g. `owner`, `admin`, `member`
- _@return_ `{ code, user }`

### enableUserPassport

`client.enableUserPassport({ userDid, passportId })`

set passport status to `valid`

- _@param_ **userDid** `string`
- _@param_ **passportId** `string` passportId (get from user.passports)
- _@return_ `{ code, user }`

### revokeUserPassport

`client.revokeUserPassport({ userDid, passportId })`

set passport status to `revoked`

- _@param_ **userDid** `string`
- _@param_ **passportId** `string` passportId (get from user.passports)
- _@return_ `{ code, user }`

### grantPermissionForRole

`client.grantPermissionForRole(role, permission)`

- _@param_ **role** `string` the name of the role
- _@param_ **permission** `string` the name of the permission
- _@return_ `{ code }`

### revokePermissionFromRole

`client.revokePermissionFromRole(role, permission)`

- _@param_ **role** `string` the name of the role
- _@param_ **permission** `string` the name of the permission
- _@return_ `{ code }`

### updatePermissionsForRole

`client.updatePermissionsForRole(role, permissions)`

Full update permissions of a role

- _@param_ **role** `string` the name of the role
- _@param_ **permissions** `array<string>` name of the permissions
- _@return_ `{ code, role }`

### hasPermission

`client.hasPermission(role, permission)`

- _@param_ **role** `string` the name of the role
- _@param_ **permission** `string` the name of the permission
- _@return_ `{ code, result }`
  - **result** `boolean`

### getPermissions

`client.getPermissions()`

Get all permissions of the app

- _@return_ `{ code, permissions }`

### createPermission

`client.createPermission({ name, title, description })`

- _@param_ **name** `Permission` the key of the permission, should be unique
  - format: `<action>_<resource>`. e.g. `query_article`, `mutate_user`
- _@param_ **description** `string`
- _@return_ `{ code, role }`

### updatePermission

`client.updatePermission(name, { title, description })`

- _@param_ **name** `string` the key of the role
- _@param_ **title** `string`
- _@param_ **description** `string`
- _@return_ `{ code }`

### deletePermission

`client.deletePermission(name, { title, description })`

- _@param_ **name** `string` the key of the permission
- _@return_ `{ code }`

## Notification

```javascript
const { Notification: Notification } = require('@blocklet/sdk');
```

### sendToUser

`Notification.sendToUser(receiver, notification)`

Send notification to an account

```javascript
const userDid = 'xxxxxxxx';

const notification = {
  title: 'xxx',
  body: 'xxx',
  attachments: [
    {
      type: 'asset',
      data: {
        did: 'xxx',
        chainHost: 'https://chainhost',
      },
    },
  ],
  actions: [
    {
      name: 'xxx',
      title: 'Go To Website',
      link: 'https://arcblock.io',
    },
  ],
};

const content = { message: 'this is a message' };
const actions = [];

await Notification.sendToUser(userDid, notification);

await Notification.sendToUser(userDid, [notification, anotherNotification]);
await Notification.sendToUser([userDid, anotherUserDid], notification);
await Notification.sendToUser([userDid, anotherUserDid], [notification, anotherNotification]);
```

- **notification** [Notification](#notification-type)
- **receiver** `string | array<string>` required

### broadcast

`Notification.broadcast(notification, options)`

Broadcast notification to a channel

```javascript
const notification = {
  title: 'xxx',
  body: 'xxx',
};

await Notification.broadcast(notification);
await Notification.broadcast(notification, { socketDid: 'did' });
```

- **notification** [Notification](#notification-type)
- **options**
  - **socketDid**: `String` send notification to a specific socket by socketDid
  - **socketId**: `String` send notification to a specific socket by socketId
  - **channel**: `String` send notification to which channel (Default: app public channel)
  - **event**: `String` send notification to which event (Default: 'message')

### Notification Type

- **notification** `object | array<object>` required
  - **notification.title** `string`
  - **notification.body** `string`
  - **notification.attachments** `array<object>`
    - **attachment.type** `enum` 'asset', 'vc', 'token' required
    - **attachment.data** `object`
      - _type: text_
        - **type** `string`
        - **message** `string`
      - _type: asset_
        - **did** `string`
        - **chainHost** `string` uri
      - _type: vc_
        - **credential** `object`
        - **tag** `string`
      - _type: token_
        - **address** `string` did
        - **amount** `string`
        - **symbol** `string`
        - **senderDid** `string`
        - **chainHost** `string`
        - **decimal** `integer`
  - **notification.actions** `array<object>`
    - **name** `string` required
    - **title** `string`
    - **color** `string`
    - **bgColor** `string`
    - **link** `string` uri

### on

`Notification.on()`

Listen for system notification

```javascript
Notification.on('hi', () => {});
```

### off

`Notification.off()`

Cancel listening for system messages

```javascript
const handler = () => {};

Notification.on('hi', handler);
Notification.off('hi', handler);
```

### System Events

#### 'hi'

When the client joins the app public channel

```js
Notification.on('hi', ({ sender: { socketId, did } }) => {});
```

- **sender** `object`
  - **sender.socketId** `string`
  - **sender.did** `string`

## DID Connect

```javascript
import AuthStorage from '@arcblock/did-auth-storage-nedb';
import { WalletAuthenticator, WalletHandlers } from '@blocklet/sdk';

const authenticator = new WalletAuthenticator();

const handlers = new WalletHandlers({
  authenticator,
  tokenGenerator: () => Date.now().toString(),
  tokenStorage: new AuthStorage({
    dbPath: path.join(process.env.BLOCKLET_DATA_DIR, 'auth.db'),
    onload: (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(`Failed to load database from ${path.join(process.env.BLOCKLET_DATA_DIR, 'auth.db')}`, err);
      }
    },
  }),
});
```

## Database

A database library for develop blocklet, it's a wrapper of [nedb](https://www.github.com/Arcblock/nedb).
Supply a simpler way to use nedb. Just use `new Database([dbName])`, or you can pass a object option as second parameter to create a database as origin nedb way `new Database([dbName], [options])`

Supply full-promise and typescript support.

```javascript
import { Database } from '@blocklet/sdk';

// Getting Started
(async () => {
  const db = new Database('demo.db');
  const inserted = await db.insert({ key: 'value' });
  const docs = await db.find({});
  const paginated = await db.cursor({}).skip(1).limit(10).exec();
})();

// Extend with class
(async () => {
  class MyDatabase extends Database {
    async extraFn() {
      return 'extra';
    }
  }
  const db = new MyDatabase('demo.db');
  const inserted = await db.insert({ key: 'value' });
  const docs = await db.find({});
  const paginated = await db.cursor({}).skip(1).limit(10).exec();
  const extra = await db.extraFn();
})();
```

## Environment

```javascript
import { env } from '@blocklet/sdk';

const {
  appId, // the id of the app
  appName, // the title of the app, used to display to user
  appDescription, // the description of the app
  appUrl, // the web url of the app
  isComponent, // the blocklet is running as an app or a component
  dataDir, // the data dir of the blocklet
  cacheDir, // the cache dir of the blocklet
  mode, // in which mode the blocklet is running
  preferences, // blocklet preferences
} = env;
```

Please reference [Blocklet Preferences](/how-to/preferences) for how to change the structure and value in `env.preferences`.

### mode

In which mode the blocklet is running

```js
env.mode === 'development'; // The blocklet is running in the development mode
env.mode === 'production'; // The blocklet is running in the production mode
```

## Component

```javascript
import { Component } from '@blocklet/sdk';
```

### getParentWebEndpoint

`Component.getParentWebEndpoint()`

- _@return_ endpoint of parent component. e.g. `http://127.0.0.1:5678`

### getChildWebEndpoint

`Component.getChildWebEndpoint(name)`

- _@param_ **name** `string` the name of **component instance** defined in parent's blocklet.yml

  If blocklet.yml is

  ```
  components
    - name: component-1
      source:
        store: xxx
        name: xxx
        version: xxx
  ```

  the blocklet should use like this: `Component.getChildWebEndpoint('component-1')`

- _@return_ endpoint of child component. e.g. `http://127.0.0.1:5678`

### getComponentWebEndpoint

`Component.getComponentWebEndpoint(name)`

Get endpoint of first-level component of app

- _@param_ **name** `string` the name or title or did of the **component bundle**

  If the blocklet.yml of component is

  ```
  did: did1
  name: demo-blocklet
  title: Demo Blocklet
  ```

  the blocklet should use like this:

  ```
  Component.getComponentWebEndpoint('did1')
  Component.getComponentWebEndpoint('demo-blocklet')
  Component.getComponentWebEndpoint('Demo Blocklet')
  ```

- _@return_ endpoint of the first-level component. e.g. `http://127.0.0.1:5678`

### getComponentMountPoint

`Component.getComponentMountPoint(name)`

Get mount point of first-level component of app

- _@param_ **name** `string` the name or title or did of the **component bundle**

  If the blocklet.yml of component is

  ```
  did: did1
  name: demo-blocklet
  title: Demo Blocklet
  ```

  the blocklet should use like this:

  ```
  Component.getComponentMountPoint('did1')
  Component.getComponentMountPoint('demo-blocklet')
  Component.getComponentMountPoint('Demo Blocklet')
  ```

- _@return_ mount point of the first-level component. e.g. `/abc`

### call

Communicate with child component or parent component safely

`Component.call({ name, path, data })`

- _@param_ **name** `string`
  - parent call child by set `name` to **component instance** defined in parent's blocklet.yml
  - parent call child by set `name` to empty
- _@param_ **path** `string` the http api. e.g. `/api/xxx`
  - blocklet must use **POST** for the api
- _@param_ **data** `object` the payload
- _@return_ `object` the response of axios https://github.com/axios/axios#response-schema

e.g.

parent:

```yml
components:
  - name: component1
    source:
      store: xxx
      name: bundle-component-1
      version: xxx
```

```js
import { Component, middlewares } from '@blocklet/sdk';

const app = express();

app.post(
  '/api/parent',

  // You should use verifySig middleware to prevent unknown request
  middlewares.component.verifySig,

  (req, res) => {
    // req.body is { msg: "ping from child" } if the request is from component1

    res.json({ msg: 'pong from parent' });
  }
);

// data: { msg: 'pong from child' }
const { data } = await Component.call({
  name: 'component1',
  path: '/api/child',
  data: { msg: 'ping from parent' },
});
```

bundle-component-1:

```js
const app = express();

app.post(
  '/api/child',

  // You should use verifySig middleware to prevent unknown request
  middlewares.component.verifySig,

  (req, res) => {
    // req.body is { msg: "ping from parent" } if the request is from parent

    res.json({ msg: 'pong from child' });
  }
);

// data: { msg: 'pong from parent' }
const { data } = await Component.call({
  path: '/api/parent',
  data: 'ping from child',
});
```

## Middlewares

```javascript
import express from 'express';
import { middlewares } from '@blocklet/sdk';

const app = express();

app.get('/', middlewares.user(), (req, res) => {
  const { did, fullName, role } = req.user;
});

app.get('/auth1', middlewares.auth(), (req, res) => {
  // will return 401 if user is not connected
});

app.get('/auth2', middlewares.auth({ roles: ['admin', 'owner'] }), (req, res) => {
  // will return 401 if user is not connected
  // will return 403 if user role is neither owner nor admin
});

app.get('/auth2', middlewares.auth({ permissions: ['mutate_data', 'query_data'] }), (req, res) => {
  // will return 401 if user is not connected
  // will return 403 if neither 'mutate_data' nor 'query data' in user permissions
});

app.get(
  '/auth3',
  middlewares.auth({ roles: ['admin', 'owner'], permissions: ['mutate_data', 'query_data'] }),
  (req, res) => {
    // will return 401 if user is not connected
    // will return 403 if user role is neither owner nor admin
    // will return 403 if neither 'mutate_data' nor 'query data' in user permissions
  }
);

app.post('/component-private-api', middlewares.component.verifySig, (req, res) => {
  // will return 400 if sig not found in req
  // will return 401 if verify sig failed
});
```

## Security

When blocklet needs to encrypt and decrypt sensitive information, the security module comes to help:

```javascript
const assert = require('assert');
const { Security } = require('@blocklet/sdk');

const message = 'some sensitive info';
const encrypted = Security.encrypt(message);
const decrypted = Security.decrypt(encrypted);
assert.notEqual(encrypted, message);
assert.notEqual(encrypted, decrypted);
assert.equal(decrypted, message);
```

:::Alert
The security module uses AES encryption internally, all encryption params are derived from blocklet server secret key using a deterministic algorithm.
:::
