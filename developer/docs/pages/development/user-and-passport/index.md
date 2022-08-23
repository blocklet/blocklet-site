---
title: User and Passport
description: User and Passport
layout: documentation
---

> <p style={{color:"red"}}>TODO: this page should be updated</p>

Blocklet Server provides generic auth service for Blocklets.

Auth service provides the following capabilities

- Get user identity
- Get user permissions
- Intercept unlogged requests (do not intercept by default)
- Intercept unauthorised requests (do not intercept by default)
- Set invite login and open login (default is open login)

## Getting Started

[static-demo-blocklet](https://github.com/blocklet/html-2048-sample) is an html5 game that can be run on Blocklet Server. The following will introduce how to make a static-demo-blocklet that is only accessible after login.

0. Prerequisites: Install and run Blocklet Server v1.7.0 or higher locally

1. Download the project source code [html-2048-sample](https://github.com/blocklet/html-2048-sample)

2. Open `blocklet.yml` in the project root directory, find the interface whose name is publicUrl, and add the Auth configuration

```yml
interfaces:
  - type: web
    name: publicUrl
    path: /
    prefix: '*'
    port: BLOCKLET_PORT
    protocol: tcp
+   services:
+     - name: 'auth'
+       config:
+         blockUnauthenticated: true
```

3. Execute `blocklet bundle` in the project root directory. After successful execution, you will see the successfully created blocklet bundle in `.blocklet/bundle`.

```
linchen@LinkdeMacBook-Pro html-2048-sample % blocklet bundle

ℹ Bundling in zip mode for blocklet static-demo-blocklet...

✔ Creating blocklet bundle in .blocklet/bundle... Done in 0.018s
✔ Blocklet static-demo-blocklet@1.1.21 is successfully bundled!
```

4. Execute `blocklet deploy .blocklet/bundle` in the project root directory to publish the blocklet bundle to the locally running Blocklet Server.

```
linchen@LinkdeMacBook-Pro html-2048-sample % blocklet deploy .blocklet/bundle
ℹ Try to deploy blocklet from /Users/linchen/code/blocklet/html-2048-sample/.blocklet/bundle to Local Blocklet Server
ℹ Node did from config zNKqGAvUzcCowxtNA5r5gKQYUm2hR4X2SE2o
ℹ Load config from /Users/linchen/code/arcblock/andata/.abtnode/abtnode.yml
✔ Blocklet static-demo-blocklet@1.1.21 was successfully deployed!
```

5. Start Static Demo in Blocklet Server dashboard

![](./images/static-demo-1.png)

6. When you visit Static Demo, you will see the login page, which means that Static Demo already has the Auth capability.

![](./images/static-demo-2.png)

7. After the login is successful, you will successfully see the game page. At this point, you will see the information of the logged-in user in the Blocklet Server dashboard.

![](./images/static-demo-3.png)

Congratulations!

## Demo

[https://github.com/blocklet/auth-demo](https://github.com/blocklet/auth-demo): Implement login, logout, display user information, authentication and authorization functions based on Auth Service

## Configure the Auth service

All blocklets are installed with Auth capabilities. You can also configure the Auth service in `blocklet.yml`

e.g.

```yml
interfaces:
  - type: web
    name: publicUrl
    # ... other interface config
    services:
      - name: 'auth'
        config:
          invitedUserOnly: no
          profileFields:
            - fullName
            - email
            - avatar
          webWalletUrl: https://web.abtwallet.io
          ignoreUrls:
            - /public/**
          blockUnauthenticated: false
          blockUnauthorized: false
```

- invitedUserOnly: Is only invited users are allowed to login?
  - default: no
- profileFields: What info do you want user to provide when login?
  - default: [fullName, email, avatar]
- blockUnauthenticated: Do you want Auth Service block unauthenticated requests for you?
  - default: true
- blockUnauthorized: Do you want Auth Service block unauthorized requests for you?
  - default: false
- ignoreUrls: Which URLs do not need to be protected?
  - default: none
- webWalletUrl: The URL of your preferred web wallet instance
  - default: https://web.abtwallet.io

## Set accessible after login

After setting the login access, the Auth service will automatically intercept requests that are not logged in, and jump to the login page

```yml
interfaces:
  - type: web
    name: xxxx
    # ... other interface config
    services:
      - name: 'auth'
        config:
          blockUnauthenticated: true
```

## Set accessible after authorization

After enabling Auth Service, Auth Service will **not** automatically intercept unauthorized requests. Blocklet needs to handle it by itself.

If Blocklet wants Auth Service to automatically intercept unauthorized requests, you can do the following configuration:

```yml
interfaces:
  - type: web
    name: xxxx
    # ... other interface config
    services:
      - name: 'auth'
        config:
          blockUnauthorized: true
```

After setting the Auth Service automatic interception, you need to bind the corresponding interface permissions for the user in the Blocklet Server dashboard.（The permission control of Blocklet Server is based on [RBAC](https://en.wikipedia.org/wiki/Role-based_access_control)）

![](./images/permissions.png)

## Set invitation login or open login

Configure invitation login or open login via `invitedUserOnly`

```yml
interfaces:
  - type: web
    name: xxxx
    # ... other interface config
    services:
      - name: 'auth'
        config:
          invitedUserOnly: yes
```

- invitedUserOnly
  - no: Open login (default)
  - yes: Only log in via invitation link
