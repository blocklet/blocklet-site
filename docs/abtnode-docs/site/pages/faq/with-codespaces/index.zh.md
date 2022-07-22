---
title: '在 Codespaces 中开发 Blocklets'
description: '使用 Codespaces 开发 Blocklets'
keywords: 'blocklet server, blocklet, codespaces'
author: 'linchen'
category: ''
layout: 'documentation'
tags:
  - 'blocklet server'
  - 'blocklet'
  - 'codespaces'
---

[Codespaces](https://docs.github.com/en/free-pro-team@latest/github/developing-online-with-codespaces/about-codespaces) 是 Github 推出的云开发环境，你可以完全在云中进行开发。

## 在项目中配置 .devcontainer
- 将 https://github.com/blocklet/blocklet-dev-container 中 `.devcontainer` 目录拷贝至你的项目的根目录下
- 将本地代码 Push 到 Github

## 在 Codespaces 中打开项目
请参考 https://docs.github.com/en/free-pro-team@latest/github/developing-online-with-codespaces/creating-a-codespace

## 启动开发环境

> 请确保 `blocklet dev` 可以在你的项目中正常工作

在你的 codespaces 中

- 执行 `blocklet dev` 启动开发环境
- 启动开发环境成功后，使用 `Command + MouseDown` 访问 terminal 中的连接

```
✔ Blocklet react-demo@0.1.3 was successfully started

ℹ You can access with the following URL

- http://127.0.0.1/admin/welcome/

ℹ Note that your blocklet is running in development in Blocklet Server,
ℹ To run it in production mode, you can use blocklet bundle and then blocklet deploy.
```

> 当你再次打开 codespace 时,你的 Blocklet Server daemon 可能已被关闭。此时，请先执行 `blocklet server start` 启动 Blocklet Server daemon

## FAQ

### 无法登录 Blocklet Server

目前，Codespaces 中的服务尚未支持公开访问，所以移动端的 DID Wallet 无法与 Codespace 中的 Blocklet Server 通信。一个临时解决方案是使用 [ngrok](https://ngrok.com/) 建立一个通道，绕过 Codespaces.

1. 安装 ngrok

```bash
# In your codespace

curl https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip -o ngrok.zip
unzip ./ngrok.zip
```

2. 设置 ngrok
    - 登录 ngrok: https://dashboard.ngrok.com/login
    - 在你的 codespace 中 设置 authtoken，参考 [https://dashboard.ngrok.com/get-started/setup](https://dashboard.ngrok.com/get-started/setup)

3. 使用 ngrok 建立 Blocklet Server 访问通道

```bash
# In your codespace

./ngrok http 80
```

访问通道建立成功后，可以通过 Terminal 中的 Forwarding 地址访问 Blocklet Server

```
ngrok by @inconshreveable

Session Status                online
Account                       linchen1987 (Plan: Free)
Version                       2.3.35
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://xxxxxxxxxxxx.ngrok.io -> http://localhost:80
Forwarding                    https://xxxxxxxxxxxx.ngrok.io -> http://localhost:80

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```
