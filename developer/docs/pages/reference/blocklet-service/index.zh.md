---
title: Blocklet Service
description: Blocklet Service
layout: documentation
---

Blocklet Service 为 Blocklet 提供了一些开箱即用的服务。

Blocklet 安装后，可通过 `{blocklet domain}/{以下路径}` 访问

比如 https://developer.blocklet.io/.well-known/service/health

## Web 页面

- `/.well-known/service/lost-passport` 找回通行证
- `/.well-known/service/login` 访问登录页
- `/.well-known/service/admin` 访问管理后台
- `/.well-known/service/blocklet/logo` 获取应用 Logo

## API

- `/.well-known/service/health` 当 Blocklet 运行中时 返回 200, 否则返回 503
- `/.well-known/service/api/did/session` 获取当前登录用户信息
