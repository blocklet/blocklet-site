---
title: User and Passport
description: User and Passport
layout: documentation
---

Blocklet Auth Service provides DID-based authentication and Passport-based access control for Blocklets.

Developers can obtain authentication and access control capabilities by configuration or API, without having to implement them from scratch.

- Get user identity
- Get user permissions
- Set who can access
- Block unauthenticated requests
- Block unauthorised requests

You can experience the above functions through [Auth Demo](/samples/auth-demo)

## Configure Blocklet Auth Service

Configured in the Web Interface declared in `blocklet.yml`

```yml
# blocklet.yml

interfaces:
  - type: web
    services:
      - name: auth # Auth service for this access interface
        config:
          whoCanAccess: all # Who can access (can be dynamically modified after the app is installed)
          blockUnauthenticated: false # Whether to automatically intercept unauthenticated requests and jump to the login page (default: false)
          blockUnauthorized: false # Whether to automatically block unauthorized requests (default: false)
          allowSwitchProfile: true # Whether to support switching profiles (default: true)
          profileFields: # Information to provide when logging in
            - fullName
            - email
            - avatar
          ignoreUrls: [] # Which interfaces allow any request to access
    # The following properties has nothing to do with auth
    protocol: http
    name: publicUrl
    port: BLOCKLET_PORT
    path: /
    prefix: '*'
```

## Login

Users can login to Blocklet without registration

### Add the login component to the page

```js
import React from 'react';
import { ThemeProvider, createTheme } from '@arcblock/ux/lib/Theme';
import { createAuthServiceSessionContext } from '@arcblock/did-connect/lib/Session';
import Header from '@blocklet/ui-react/lib/Header';

const { SessionProvider } = createAuthServiceSessionContext();

const theme = createTheme();
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <Header />
      </SessionProvider>
    </ThemeProvider>
  );
}
```

More: [Blocklet UI](/development/blocklet-ui-usage)

### Use default login page

When `blockUnauthenticated` is set to `true`, unauthenticated requests will be automatically blocked to the default login page

### View Users

After a user logs into the Blocklet, Blocklet Auth Service records the user's identity.

Developers can query user information through Blocklet SDK

- [getUser()](/reference/blocklet-sdk#getuser)
- [getUsers()](/reference/blocklet-sdk#getusers)
- [getOwner()](/reference/blocklet-sdk#getowner)

## User Permissions and Passports

Blocklet Auth Service uses role-based access control [RBAC](https://en.wikipedia.org/wiki/Role-based_access_control)

Different from the traditional permission control system, the user's role is not stored in the server, but in the user's own wallet.

The way Blocklet grants user roles is by issuing a passport to the user, which records the user's role. The user provides the corresponding passport when logging in to obtain the right to operate the resource.

Developers can create roles and manage their permissions through [Blocklet SDK](/reference/blocklet-sdk#auth).

Creating a role creates a passport.

Blocklet consumers can issue and manage passports for users in the Blocklet console.

Blocklet has 4 default passports (developer does not need to create via API to use)

- `owner`: Only Blocklet owners will get this passport. The Blocklet owner is the one who installed and started the Blocklet for the first time.
- `admin`: It is recommended to issue this passport to the administrator of the Blocklet
- `member`: It is recommended to issue this passport to internal members of the Blocklet
- `guest`: Usually no passport is required for the guest, this passport can be issued if required

## Access control

### Set who can access

Developers specify who can access by `whoCanAccess` in `blocklet.yml`

- `all`: Accessible to everyone
- `owner`: Only blocklet owner can access
- `invited`: Only invited people (internal members) can access

> This configuration can be modified by the application owner

### Forbid unlogin requests

Method 1: When `blockUnauthenticated` is set to `true`, unlogged requests will be automatically intercepted to the default login page

Method 2: Implement in code, see [Middleware](/reference/blocklet-sdk#middlewares)

### Forbid unauthorised requests

#### Only allow specified roles to access

Implemented in code, see [Middleware](/reference/blocklet-sdk#middlewares)

#### Only allow access with specified permissions

Method 1: When `blockUnauthorized` is set to `true`, unauthorised requests will be automatically blocked

Method 2: Implement in code, see [Middleware](/reference/blocklet-sdk#middlewares)
