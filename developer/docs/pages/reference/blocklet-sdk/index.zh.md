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

```js
client.getUsers();
client.getUsers({ paging: { page: 2 } });
client.getUsers({ query: { role: 'admin' } });
client.getUsers({ query: { approved: true } });
client.getUsers({ query: { search: 'Bob' } });
client.getUsers({ sort: { updatedAt: -1 } });
```

- _@param_ **paging** `Object`
  - **paging.pageSize** ``
  - **paging.page** `
  - > pageSize 的值不能超过 100
- _@param_ **query** `Object`
  - **query.role** `String` 通过角色名称匹配
    - `$none`: 匹配没有角色的用户
  - **query.approved** `Boolean` 通过 approved 搜索
  - **query.search** `String` 通过 DID 或 用户名搜索
    - > 通过用户名的搜索结果是模糊匹配
    - > 通过 DID 的搜索结果是精确匹配
- _@param_ **sort** `Object`
  - **sort.createdAt** `Number`
  - **sort.updatedAt** `Number`
  - **sort.lastLoginAt** `Number`
  - > `-1`: 最近的时间是排在第一个。 `1`：最近的时间排在最后一个。
  - > 默认排序是`{ createdAt: -1 }`
- _@return_ `{ code, users, paging }`

```
Paging {
  total: 用户总数
  pageSize: 每页用户数
  pageCount: 页数
  page: 当前是第几页
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

说明：

- 如果你不传入 `dids` 参数, 将会通过默认方式获取
- 如果你传入了不存在的 DID, 接口 **不会** 报错

### updateUserApproval

禁用或者起用某个用户，被禁用的用户无法再使用你的应用。

- _@param_ **did** `string`
- _@param_ **approved** `boolean`
- _@return_ `{ code, user }`

```js
client.updateUserApproval(did, true); // enable the user
client.updateUserApproval(did, false); // disable the user
```

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

### login

`client.login({ provider, did, pk, avatar, email, fullName, id, locale })`

- _@return_ `{ user, token, refreshToken }`

### refreshSession

`client.refreshSession({ refreshToken })`

- _@param_ **refreshToken** `string` the refresh token 
- _@return_ `{ user, token, refreshToken }`

## Notification

```javascript
const { Notification } = require('@blocklet/sdk');
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
  appId, // 应用 DID
  appPid, // 应用永久 DID
  appIds, // 应用曾使用过的所有 DID
  appName, // 应用名称，用于显示给用户
  appDescription, // 应用描述，用于显示给用户
  appUrl, // 应用的的访问地址
  dataDir, // 组件 数据存放目录
  cacheDir, // 组件 缓存数据路径
  mode, // 组件 以什么模式运行
  appStorageEndpoint // 应用绑定的 DID Space 的 endpoint
  serverVersion: // 应用运行所在server的版本
  preferences, // 应用的偏好设置。默认值: {}
} = env;
```

请参照 [应用偏好](/how-to/preferences) 来了解如何修改 `env.preferences` 的结构和数据。

### mode

Blocklet 以什么模式运行

```js
env.mode === 'development'; // Blocklet 以开发模式运行
env.mode === 'production'; // Blocklet 以正式模式运行
```

## Config

和 Environment 不用的是 Config 中的信息会实时更新，应用无需重启

```javascript
import { env, components } from '@blocklet/config'
```

- `env` Environment 中的 env 相同
  - `appId` 应用 DID
  - `appPid` 应用永久 DID
  - `appIds` 应用曾使用过的所有 DID
  - `appName` 应用名称，用于显示给用户
  - `appDescription` 应用描述，用于显示给用户
  - `appUrl` 应用的的访问地址
  - `dataDir` Blocklet 数据存放目录
  - `cacheDir` Blocklet 缓存数据路径
  - `mode` Blocklet 以什么模式运行
  - `appStorageEndpoint` 应用绑定的 DID Space 的 endpoint
  - `serverVersion` 应用运行所在server的版本
  - `preferences` 应用 的偏好设置。默认值: {}
- `components` **Array\<object\>**
  - `title` 组件名称
  - `did` 组件 DID
  - `name` 组件 name
  - `mountPoint` e.g. '/', '/blog'
  - `status` **import(@blocklet/constant).BlockletStatus**
  - `port` e.g. 5678
  - `webEndpoint` e.g. http://127.0.0.1:5678

## Component

```javascript
import { Component } from '@blocklet/sdk';
```

### getComponentWebEndpoint

`Component.getComponentWebEndpoint(name)`

Get endpoint of component of app

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

Get mount point of component of app

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

Communicate with other component safely

`Component.call({ name, path, data })`

- _@param_ **name** `string` the name or title or did of the **component bundle**
- _@param_ **path** `string` the http api. e.g. `/api/xxx`
- _@param_ **data** `object` the payload
- _@param_ **method** `object` http method
- _@param_ **responseType** `undefined | 'stream'` response type
- _@return_ `object` the response of axios https://github.com/axios/axios#response-schema

e.g.

component-1:

```js
import { Component, middlewares } from '@blocklet/sdk';

const app = express();

app.post(
  '/api/component-2',

  // You should use verifySig middleware to prevent unknown request
  middlewares.component.verifySig,

  (req, res) => {
    // req.body is { msg: "ping from component-2" } if the request is from component-2

    res.json({ msg: 'pong from component-1' });
  }
);

// data: { msg: 'pong from component-2' }
const { data } = await Component.call({
  name: 'component-1',
  path: '/api/component-2',
  data: { msg: 'ping from component-1' },
});
```

component-2:

```js
const app = express();

app.post(
  '/api/component-2',

  // You should use verifySig middleware to prevent unknown request
  middlewares.component.verifySig,

  (req, res) => {
    // req.body is { msg: "ping from component-1" } if the request is from component-1

    res.json({ msg: 'pong from component-2' });
  }
);

// data: { msg: 'pong from component-1' }
const { data } = await Component.call({
  path: '/api/component-1',
  data: 'ping from component-2',
});
```

## Middlewares

### User

```javascript
import express from 'express';
import { middlewares } from '@blocklet/sdk';

const app = express();

app.get('/', middlewares.user(), (req, res) => {
  const { did, fullName, role } = req.user;
});
```

### Access

```javascript
import express from 'express';
import { middlewares } from '@blocklet/sdk';

const app = express();

app.get('/auth1', middlewares.auth(), (req, res) => {
  // will return 401 if user is not connected
});

app.get('/auth2', middlewares.auth({ roles: ['admin', 'owner'] }), (req, res) => {
  // will return 401 if user is not connected
  // will return 403 if user role is neither owner nor admin
});

app.get('/auth3', middlewares.auth({ permissions: ['mutate_data', 'query_data'] }), (req, res) => {
  // will return 401 if user is not connected
  // will return 403 if neither 'mutate_data' nor 'query data' in user permissions
});

app.get(
  '/auth4',
  middlewares.auth({ roles: ['admin', 'owner'], permissions: ['mutate_data', 'query_data'] }),
  (req, res) => {
    // will return 401 if user is not connected
    // will return 403 if user role is neither owner nor admin
    // will return 403 if neither 'mutate_data' nor 'query data' in user permissions
  }
);
```

### Secure communication between components

```javascript
import express from 'express';
import { middlewares } from '@blocklet/sdk';

const app = express();

app.post('/component-private-api', middlewares.component.verifySig, (req, res) => {
  // will return 400 if sig not found in req
  // will return 401 if verify sig failed
});
```

## Security

当 Blocklet 需要对敏感信息进行加密和解密时，Security 模块可直接使用。

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
Security 模块在内部使用了 AES 加密，所有的参数都是使用确定的算法从 Blocklet Server 私钥计算得到。
:::
