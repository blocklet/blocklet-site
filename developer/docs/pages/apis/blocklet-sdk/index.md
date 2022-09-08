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
const { AuthService } = require('@blocklet/sdk');

const client = new AuthService();
```

### client.getUser(did)

Get user by user did

- _@param_ **did** `string`
- _@return_ `{ code, user }`

### client.getOwner()

Get owner of the app

- _@param_ **did** `string`
- _@return_ `{ code, user }`

### client.getUsers()

Get all users of the app

- _@param_ **paging** `Object`
  - **paging.pageSize** ``
  - **paging.page** ``
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
- _@return_ `{ code, users, paging }`

```
Paging {
  total: number of users
  pageSize: number of users per page
  pageCount: number of page
  page: current page number
}
```

### client.getPermissionsByRole(role)

Get all permissions of a role

- _@param_ **role** `string`
- _@return_ `{ code, permissions }`

### client.getRoles()

Get all roles of the app

- _@return_ `{ code, roles }`

### client.createRole(\{ name, title, description \})

- _@param_ **name** `string` the key of the role, should be unique
- _@param_ **title** `string`
- _@param_ **description** `string`
- _@return_ `{ code, role }`

### client.updateRole(name, \{ title, description \})

- _@param_ **name** `string` the key of the role
- _@param_ **title** `string`
- _@param_ **description** `string`
- _@return_ `{ code, role }`

### client.deleteRole(name, \{ title, description \})

- _@param_ **name** `string` the key of the role
- _@return_ `{ code }`

### client.issuePassportToUser(\{ userDid, role \})

- _@param_ **userDid** `string`
- _@param_ **role** `string` the key of the role. e.g. `owner`, `admin`, `member`
- _@return_ `{ code, user }`

### client.enableUserPassport(\{ userDid, role \})

set passport status to `valid`

- _@param_ **userDid** `string`
- _@param_ **passportId** `string` passportId (get from user.passports)
- _@return_ `{ code, user }`

### client.revokeUserPassport(\{ userDid, role \})

set passport status to `revoked`

- _@param_ **userDid** `string`
- _@param_ **passportId** `string` passportId (get from user.passports)
- _@return_ `{ code, user }`

### client.grantPermissionForRole(role, permission)

- _@param_ **role** `string` the name of the role
- _@param_ **permission** `string` the name of the permission
- _@return_ `{ code }`

### client.revokePermissionFromRole(role, permission)

- _@param_ **role** `string` the name of the role
- _@param_ **permission** `string` the name of the permission
- _@return_ `{ code }`

### client.updatePermissionsForRole(role, permissions)

Full update permissions of a role

- _@param_ **role** `string` the name of the role
- _@param_ **permissions** `array<string>` name of the permissions
- _@return_ `{ code, role }`

### client.hasPermission(role, permission)

- _@param_ **role** `string` the name of the role
- _@param_ **permission** `string` the name of the permission
- _@return_ `{ code, result }`
  - **result** `boolean`

### client.getPermissions()

Get all permissions of the app

- _@return_ `{ code, permissions }`

### client.createPermission(\{ name, title, description \})

- _@param_ **name** `Permission` the key of the permission, should be unique
  - format: `<action>_<resource>`. e.g. `query_article`, `mutate_user`
- _@param_ **description** `string`
- _@return_ `{ code, role }`

### client.updatePermission(name, \{ title, description \})

- _@param_ **name** `string` the key of the role
- _@param_ **title** `string`
- _@param_ **description** `string`
- _@return_ `{ code }`

### client.deletePermission(name, \{ title, description \})

- _@param_ **name** `string` the key of the permission
- _@return_ `{ code }`

## Notification

```javascript
const { NotificationService: Notification } = require('@blocklet/sdk');
```

### sendToUser(receiver, notification)

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

- **notification** [Notification](#Type:%20Notification)
- **receiver** `string | array<string>` required

### broadcast(notification, options)

Broadcast notification to a channel

```javascript
const notification = {
  title: 'xxx',
  body: 'xxx',
};

await Notification.broadcast(notification);
await Notification.broadcast(notification, { socketDid: 'did' });
```

- **notification** [Notification](#Type:%20Notification)
- **options**
  - **socketDid**: `String` send notification to a specific socket by socketDid
  - **socketId**: `String` send notification to a specific socket by socketId
  - **channel**: `String` send notification to which channel (Default: app public channel)
  - **event**: `String` send notification to which event (Default: 'message')

### Type: Notification

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

### on()

Listen for system notification

```javascript
Notification.on('hi', () => {});
```

### off()

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

// Quick start
(async () => {
  const db = new Database('demo.db');
  const inserted = await db.insert({ key: 'value' });
  const docs = await db.find({});
  const paginated = await db.cursor({}).skip(1).limit(10);
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
  const paginated = await db.cursor({}).skip(1).limit(10);
  const extra = await db.extraFn();
})();
```

## Environment

```javascript
import { env } from '@blocklet/sdk';

const { appId, appName, appDescription, appUrl, isComponent, dataDir, cacheDir } = env;

const { getWebEndpoint, getChildWebEndpoint, getParentWebEndpoint, getComponentMountPoints, getComponentMountPoint } =
  env;
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
```
