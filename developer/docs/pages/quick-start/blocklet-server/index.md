---
title: 'Setup Local Blocklet Server'
description: 'Setup Local Blocklet Server'
layout: 'documentation'
---

:::Alert{type="warning"}
Currently, only Linux (Ubuntu) and macOS are supported by Blocklet Server, users on Windows should wait for the new version.
:::

Blocklet CLI is a command line tool that can be used to manage both blocklet server and blocklets, while Blocklet Server provides the runtime environment for blocklets, you need to run blocklet server locally when developing Blocklet.

## Install Blocklet CLI

You can install the Blocklet CLI with your preferred package manager:

```bash
npm install -g @blocklet/cli
# yarn global add @blocklet/cli
# pnpm add -g @blocklet/cli
```

**Check if installation is successful:**

```bash
blocklet -V

                 Powered By
     ____ _ _ _
    / \ _ __ ___| __ )| | ___ ___| | __
   / _ \ | '__/ __| _ \| |/ _ \ / __| |/ /
  / ___ \| | | (__| |_) | (_) | (__| <
 /_/ \_\_| \___|____/|_|\___/ \___|_|\_\\

            Blocklet CLI v1.8.25

1.8.25
```

## Installing Nginx

We recommend using Nginx as the routing engine for Blocklet Server for better performance.

> If you cannot install Nginx, you can skip this step and use Blocklet Server's built-in routing engine.

**Nginx version: >= 1.18.0**

**Install on a Mac (using Homebrew)**

- `brew install nginx`
- Reference: https://formulae.brew.sh/formula/nginx

**Install on Linux**

- Reference: https://www.nginx.com/resources/wiki/start/topics/tutorials/install/

**Check if the installation is successful:**

```bash
nginx -v
nginx version: nginx/1.21.6
```

## Setup DID wallet

See [Setup DID wallet](/quick-start/did-wallet)

## Start Blocklet Server

After installing the Blocklet CLI, you can use an empty directory to store the configuration and initialize the Blocklet Server.

1. Run the `mkdir -p ~/blocklet-server-data && cd ~/blocklet-server-data` command to enter the directory. You can replace `~/blocklet-server-data` with any other directory

2. Run the `blocklet server init` command to initialize Blocklet Server

- After executing the `init` command, the system will confirm the directory where you want to store your configuration. After confirmation, the system will automatically generate your Blocklet Server configuration.

3.  Execute `blocklet server start` to start Blocklet Server

<details>
<summary>Example output</summary>

```text
linchen@arcblock demo % blocklet server init
blocklet server v1.8.25
Are you sure to initialize a Blocklet server? Are you sure to initialize a Blocklet Server instance in the current directory(/Users/linchen/code/arcblock/ad/demo) Yes
✔ Blocklet Server configuration is successfully generated /Users/linchen/code/arcblock/ad/demo/.abtnode/abtnode.yml
ℹ blocklet server start

linchen@arcblock demo % bn server start
bn server v1.8.25
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

After Blocklet Server starts successfully. You will see the URL of Blocklet Server in the terminal

```text
HTTP URLs:

- http://192.168.3.28/admin/
- http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.did.abtnet.io/admin/

Secure URLs (Recommended):

- https://192-168-3-28.ip.abtnet.io/admin/
```

- **(Recommended)** `http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.did.abtnet.io/admin/`: Accessed via DID Domain
- **(Recommended)** `https://192-168-3-28.ip.abtnet.io/admin/`: Accessed via IP Echo Domain
- (Not recommended) `http://192.168.3.28/admin/` Accessed via IP

> Note: Please replace `192.168.3.28` with your local network IP

:::Alert{type="warning"}
Note: Please do not use localhost or 127.0.0.1 address to access the Blocklet server. You will not be able to connect to it using the DID wallet.
:::

## Stop Blocklet Server

You can stop the blocklet server by executing the `blocklet server stop` command.
