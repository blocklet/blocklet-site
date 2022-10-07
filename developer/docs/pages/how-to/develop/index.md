---
title: Develop Blocklet
description: Develop Blocklet
layout: documentation
---

## Start development

#### 1. Configure startup commands in `blocklet.yml`

```yml
scripts:
  dev: npm run start
```

`scripts.dev` can be configured with arbitrary commands

#### 2. Execute `blocklet dev` in the project root directory

After the startup is complete, you will see the access address of the blocklet in the terminal

Example:

```
✔ Blocklet xxxxxxx@x.x.x was successfully started

ℹ You can access with the following URL

- http://xxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.did.abtnet.io
```

<!-- blocklet dev install/start/remove is going to be deprecated https://github.com/ArcBlock/blocklet-server/issues/5165 -->

## Stop development

After starting development, stop development by pressing `CTRL + C` in the terminal

## Get running mode

Get the current running mode through Blocklet SDK

See [Blocklet SDK: Environment](/reference/blocklet-sdk#mode)

## Clear data

After you stop developing a blocklet, the persistent data of the blocklet will not be automatically cleared.

You can clear all blocklet data with `blocklet dev clear`

## Define environment variables in blocklet.yml

The environment variables declared in blocklet.yml can be obtained through process.env.XXX after blocklet is started

Example:

```yml
environments:
  - name: KEY_1
    description: 'description for KEY_1'
    default: ''
    required: false
    secure: false
    shared: true
```

- `name`: variable name
- `description`: variable description
- `default`: default value
- `required`: is it required
- `shared`: visible to clients and components
- `secure`: Environment variables with `secure` set to `true` are stored encrypted and invisible to clients and components.

## Config blocklet environments in .env

Developers can set environment variables in the `.env` or `.env.development` file in the project root directory

Note: Only environment variables declared in blocklet.yml can be set in `.env` or `.env.development`

Example:

```
# .env

KEY_1=value1

```

> After the blocklet is installed, users can configure environment variables in the blocklet admin panel

## Get blocklet information in the page

You can get blocklet information by requesting the blocklet's `__meta__.js` interface

> The blocklet project created by Create Blocklet provides an out-of-the-box environment, and you can get application information through window.blocklet

```js
// application ID
window.blocklet.appId

// application version
window.blocklet.version

// Application Name
window.blocklet.appName

// application description
window.blocklet.appDescription

// application URL
window.blocklet.appUrl

// shared environment variables
window.blocklet.<shared env>
```

## Blocklet Scripts

Blocklet Server provides hook functionality to do something during the execution life cycle. Currently includes `pre-install, post-install, pre-start, post-start, pre-stop, pre-uninstall, pre-config` these Hooks.

See (blocklet.yml)(/reference/blocklet-spec/#Scripts)

## Running scripts in blocklet runtime

When developing blocklets, sometimes we want to execute scripts in the blocklet environment (such as building some test data).

This can be achieved by executing `blocklet exec`, e.g.

```
blocklet exec mock/test.js
```

```js
// mock/test.js

const { env } = require('@blocklet/sdk');
const { getWallet } = require('@blocklet/sdk');

console.log(env);
console.log(getWallet().address);
```

## How to do migration during upgrades

When the blocklet's persistent storage data structure changes incompatible, we can use the migration script to complete automatic data migration.

**method:**

Create a `migration` directory under the blocklet root directory

Create a migration file in the `migration` directory with the file name semver version, e.g. `1.0.1.js`

**Example:**

There are 3 files `1.0.0.js`, `1.0.1.js`, `1.1.0.js` in the migration directory

When the blocklet is upgraded from 1.0.0 to 1.2.0, the two migration scripts `1.0.1.js`, `1.1.0.js` will be executed
