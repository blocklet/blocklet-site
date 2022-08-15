---
title: Blocklet SDK
description: Blocklet SDK
layout: documentation
---

> <p style={{color:"red"}}>TODO: this page should be updated</p>

# @blocklet/sdk

Blocklet SDK for blocklet developer

## Install

```shell
yarn add @blocklet/sdk
```

or

```shell
npm install @blocklet/sdk
```

## Auth SDK

### Usage

```javascript
import Auth from '@blocklet/sdk/service/auth';

const client = new Auth();

const userDid = 'xxxxxxxx';

const { user } = await client.getUser(userDid);
```

### API

#### client.getUser(did)

Get user by user did

- _@param_ **did** `string`
- _@return_ `{ code, user }`

#### client.getUsers()

Get all users of the team

- _@return_ `{ code, users }`

#### client.getPermissionsByRole(role)

Get all permissions of a role

- _@param_ **role** `string`
- _@return_ `{ code, permissions }`

#### client.getRoles()

Get all roles of the team

- _@return_ `{ code, roles }`

#### client.createRole(\{ name, title, description \})

- _@param_ **name** `string` the key of the role, should be unique
- _@param_ **title** `string`
- _@param_ **description** `string`
- _@return_ `{ code, role }`

#### client.updateRole(name, \{ title, description \})

- _@param_ **name** `string` the key of the role
- _@param_ **title** `string`
- _@param_ **description** `string`
- _@return_ `{ code, role }`

#### client.deleteRole(name, \{ title, description \})

- _@param_ **name** `string` the key of the role
- _@return_ `{ code }`

#### client.grantPermissionForRole(role, permission)

- _@param_ **role** `string` the name of the role
- _@param_ **permission** `string` the name of the permission
- _@return_ `{ code }`

#### client.revokePermissionFromRole(role, permission)

- _@param_ **role** `string` the name of the role
- _@param_ **permission** `string` the name of the permission
- _@return_ `{ code }`

#### client.updatePermissionsForRole(role, permissions)

Full update permissions of a role

- _@param_ **role** `string` the name of the role
- _@param_ **permissions** `array<string>` name of the permissions
- _@return_ `{ code, role }`

#### client.hasPermission(role, permission)

- _@param_ **role** `string` the name of the role
- _@param_ **permission** `string` the name of the permission
- _@return_ `{ code, result }`
  - **result** `boolean`

#### client.getPermissions()

Get all permissions of the team

- _@return_ `{ code, permissions }`

#### client.createPermission(\{ name, title, description \})

- _@param_ **name** `Permission` the key of the permission, should be unique
  - format: `<action>_<resource>`. e.g. `query_article`, `mutate_user`
- _@param_ **description** `string`
- _@return_ `{ code, role }`

#### client.updatePermission(name, \{ title, description \})

- _@param_ **name** `string` the key of the role
- _@param_ **title** `string`
- _@param_ **description** `string`
- _@return_ `{ code }`

#### client.deletePermission(name, \{ title, description \})

- _@param_ **name** `string` the key of the permission
- _@return_ `{ code }`

## Notification SDK

### Usage

```javascript
import Notification from '@blocklet/sdk/service/notification';

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

### API

#### notification.sendToUser(receiver, notification)

Send notification to an account

- **receiver** `string | array<string>` required
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

## WalletAuthenticator SDK

### Usage

```javascript
import { WalletAuthenticator } from '@blocklet/sdk';

const authenticator = new WalletAuthenticator();
```

## WalletHandler SDK

### Usage

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

## Database SDK

A database library for develop blocklet, it's a wrapper of [nedb](https://www.github.com/Arcblock/nedb).
Supply a simpler way to use nedb. Just use `new Database([dbName])`, or you can pass a object option as second parameter to create a database as origin nedb way `new Database([dbName], [options])`

Supply full-promise support.

### Usage

```javascript
import { Database } from '@blocklet/sdk';

(async () => {
  const db1 = new Database('db1');
  const data1 = await db1.find().skip(1).limit(10);

  class MyDatabase extends Database {
    constructor(name) {
      super(name);
    }

    async extraFn() {
      return 'extra';
    }
  }
  const db2 = new MyDatabase('db2');
  const data2 = await db2.find().paginate(1, 10);
  const data2Extra = await db2.extraFn();
})();
```

## getWallet

### Usage

```javascript
import { getWallet } from '@blocklet/sdk';

// blocklet wallet is an instance of @ocap/wallet
const blockletWallet = getWallet();
```

## env

### Usage

```javascript
import { env } from '@blocklet/sdk';

const { name, description, isComponent, dataDir, cacheDir } = env;

// wallet is an instance of @ocap/wallet
const { wallet } = env;
const { address, secretKey, publicKey } = wallet;
```

## middlewares

### Usage

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
