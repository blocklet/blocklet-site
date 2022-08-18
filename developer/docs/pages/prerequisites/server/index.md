---
title: 'Blocklet Server Setup'
description: 'Blocklet Server Setup'
layout: 'documentation'
---

Currently, Blocklet Server can only be installed on [Linux] and [macOS]. If you want to use another operating system such as Windows, you can use a virtual machine, but you need to make sure that the ABT Wallet can access your virtual machine IP address.

## Step 1: Install [Node.js]

We recommend using [nvm] to install [Node.js], execute the following command to install [nvm]:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh)"
```

Blocklet Server will adapt to the Node.js LTS version at the first time, so we recommend installing the LTS version of Node.js.

```bash
nvm install --lts
```

> Once [Node.js] is installed, [npm] will also be installed automatically.
>
> You can install the latest [Node.js] by running the command `nvm install-latest-npm`

## Step 2: Install Nginx

We recommend using Nginx as the gateway for Blocklet Server

> If you can't install Nginx, you can skip this step and use Blocklet Server's built-in gateway

**Nginx version: >= 1.18.0**

**Install on Mac (using Homebrew)**

- `brew install nginx`
- Reference: https://formulae.brew.sh/formula/nginx

**Installation on Linux**

- Reference: https://www.nginx.com/resources/wiki/start/topics/tutorials/install/

## Step 3: Install and initialize the DID wallet

See [Get DID Wallet](/prerequisites/wallet)

## Step 4: Install Blocklet CLI

The Blocklet CLI can be installed by executing the following command using [npm]:

```bash
npm install -g @blocklet/cli
```

## Step 5: Create and start Blocklet Server

After installing the Blocklet CLI, you can use an empty directory to store the configuration and initialize the Blocklet Server.

1. Run `mkdir -p ~/blocklet-server-data && cd ~/blocklet-server-data` command to enter the directory. `~/blocklet-server-data` can be replaced with any other directory

2. Run the `blocklet server init` command to initialize the Blocklet Server

   - > After executing the initialization command, the system will confirm the directory in which you want to store the configuration. After confirmation, your Blocklet Server configuration will be automatically generated.

3. Execute `blocklet server start` to start the Blocklet Server

<details>
<summary>Example of output</summary>

```
linchen@LinkdeMacBook-Pro demo % blocklet server init
blocklet server v1.8.8
? Are you sure to initialize a Blocklet Server instance in the current directory(/Users/linchen/code/arcblock/ad/demo) Yes
✔ Blocklet Server configuration is successfully generated /Users/linchen/code/arcblock/ad/demo/.abtnode/abtnode.yml
ℹ blocklet server start

linchen@LinkdeMacBook-Pro demo % bn server start
bn server v1.8.8
✔ Blocklet Server DB Proxy ready on port 40404
ℹ Node DID from config zNKqGAvUzcCowxtNA5r5gKQYUm2hR4X2SE2o
ℹ Node config from /Users/linchen/code/arcblock/ad/.abtnode/abtnode.yml
✔ Blocklet Server Event Hub ready on port 40407
✔ Blocklet Server Updater already running
✔ Update blocklet environments success
✔ Fetch wildcard certificates successfully
✔ Starting Blocklet Service... Done in 5.065s
✔ Starting Blocklet Server Daemon... Done in 18.077s
✔ Fetching accessible IPs... Done in 5.037s
✔ Updating DID Domain... Done in 0.832s
✔ You can access your Blocklet Server with either of the following URLs

HTTP URLs:

- http://192.168.3.28/admin/
- http://znkqgavuzccowxtna5r5gkqyum2hr4x2se2o.did.abtnet.io/admin/

Secure URLs (Recommended):

- https://192-168-3-28.ip.abtnet.io/admin/
```

</details>

## Access Blocklet Server

After Blocklet Server starts successfully. You will see the URL of the Blocklet Server in the terminal

```
HTTP URLs:

- http://192.168.3.28/admin/
- http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.did.abtnet.io/admin/

Secure URLs (Recommended):

- https://192-168-3-28.ip.abtnet.io/admin/
```

- **(Recommended)** `http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.did.abtnet.io/admin/`: Access via DID Domain
- **(Recommended)** `https://192-168-3-28.ip.abtnet.io/admin/`: Access via IP Echo Domain
- (Not Recommended) `http://192.168.3.28/admin/` access via IP

> Note: Please replace `192.168.3.28` with your local network IP
>
> Note: Please do not use the localhost or 127.0.0.1 addresses to access the Blocklet server. You will not be able to connect it using DID wallet.

## Stop Blocklet Server

You can stop the blocklet server by executing the `blocklet server stop` command.

[linux]: https://www.linux.org
[macos]: https://www.apple.com/macos
[nvm]: https://github.com/nvm-sh/nvm
[node.js]: https://nodejs.org
[npm]: https://www.npmjs.com
