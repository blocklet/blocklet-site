---
title: '在本机启动 Blocklet Server '
description: '在本机启动 Blocklet Server'
layout: 'documentation'
---

Blocklet Server 是 Blocklet 的运行环境，开发 Blocklet 前你需要在本机启动 Blocklet Server。

## 支持平台

目前只能在 _Linux(Ubuntu)_ 或 _macOS_ 安装 Blocklet Server。

## 第一步：安装 Node.js

**Node.js 最低版本要求: v14**

### 使用 nvm 安装 Node.js

我们推荐使用 [nvm] 安装 Node.js, 执行下面命令，即可安装 [nvm]

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh)"
```

```bash
nvm install --lts
```

### 从官方文档安装 Node.js

你也可以从官网 https://nodejs.org/ 安装 Node.js

**检测是否安装成功：**

```bash
node -v
v16.15.0
```

## 第二步：安装 Blocklet CLI

### NPM

```bash
npm install -g @blocklet/cli
```

### YARN

```bash
yarn global add @blocklet/cli
```

### PNPM

```bash
pnpm add -g @blocklet/cli
```

**检测是否安装成功：**

```bash
blocklet -V

                 Powered By
     _             ____  _            _
    / \   _ __ ___| __ )| | ___   ___| | __
   / _ \ | '__/ __|  _ \| |/ _ \ / __| |/ /
  / ___ \| | | (__| |_) | | (_) | (__|   <
 /_/   \_\_|  \___|____/|_|\___/ \___|_|\_\

            Blocklet CLI v1.8.22

1.8.22
```

## 第三步：安装 Nginx

我们推荐使用 Nginx 作为 Blocklet Server 的网关

> 如果你无法安装 Nginx, 可以跳过此步骤，使用 Blocklet Server 的内置网关

**Nginx 版本: >= 1.18.0**

**在 Mac 上安装 (使用 Homebrew)**

- `brew install nginx`
- 参考: https://formulae.brew.sh/formula/nginx

**在 Linux 上安装**

- 参考: https://www.nginx.com/resources/wiki/start/topics/tutorials/install/

**检测是否安装成功：**

```bash
nginx -v
nginx version: nginx/1.21.6
```

## 第四步：安装并初始化 DID 钱包

见 [获取 DID 钱包](/quick-start/wallet)

## 第五步：创建并启动 Blocklet Server

安装 Blocklet CLI 后，您可以使用一个空目录存储配置并初始化 Blocklet Server。

1. 运行 `mkdir -p ~/blocklet-server-data && cd ~/blocklet-server-data` 命令进入目录。 可以将 `~/blocklet-server-data` 替换为任何其他目录

2. 运行 `blocklet server init` 命令初始化 Blocklet Server

- > 执行初始化命令后，系统将确认您要存储配置的目录。确认后，系统将自动生成您的 Blocklet Server 配置。

3. 执行 `blocklet server start` 启动 Blocklet Server

<details>
<summary>输出示例</summary>

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

## 访问 Blocklet Server

Blocklet Server 启动成功后。 您会在 terminal 中看到 Blocklet Server 的 URL

```
HTTP URLs:

- http://192.168.3.28/admin/
- http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.did.abtnet.io/admin/

Secure URLs (Recommended):

- https://192-168-3-28.ip.abtnet.io/admin/
```

- **(推荐)** `http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.did.abtnet.io/admin/`: 通过 DID Domain 访问
- **(推荐)** `https://192-168-3-28.ip.abtnet.io/admin/`: 通过 IP Echo Domain 访问
- (不推荐) `http://192.168.3.28/admin/` 通过 IP 访问

> 注意：请将替换 `192.168.3.28` 为您的本地网络 IP
>
> 注意：请不要使用 localhost 或 127.0.0.1 地址访问 Blocklet 服务器。 您将无法使用 DID 钱包连接它。

## 停止 Blocklet Server

您可以通过执行 `blocklet server stop` 命令来停止 blocklet 服务器。

[nvm]: https://github.com/nvm-sh/nvm
