---
title: Blocklet 组件
description: Blocklet 组件
layout: documentation
---

本文介绍如何开发一个 Blocklet 组件，关于如何开发一个组合型 Blocklet, 见 [创建组合 Blocklet](/guide/composite-blocklet)

## 开发组件

开发组件和 [开发应用](/guide/develop) 的方式基本相同，在开发组件时，需要为 `blocklet dev` 命令添加 `--app-id` 和 可选的 `--mount-point` 参数

`blocklet dev --app-id <blocklet-app-id> --mount-point /xxx`

`blocklet-app-id` 可在 blocklet 详情页中查看

## 组件挂载点

当一个 blocklet 被组合时，这个 blocklet 会被挂载到在父组件中配置的子路径下。

组件需要支持在任意挂载点下工作。

### 组件 API

组件 **不需要** 为 API 添加挂载点前缀，因为客户端的请求会先经过 Blocklet Service, 当组件收到请求时，已经去掉了请求的前缀

示例：

1. 组件声明 API: `/api/foo`
2. 组件挂载在 `/child` 下
3. 客户端请求 `/child/api/foo`
4. Blocklet Service 将请求转发给组件，并去掉前缀 `/child`
5. 组件收到请求 `/api/foo`

### 加载前端静态资源

因为组件的前端页面会在相对路径下被加载（比如 `/child1/index.html`），所以我们需要支持在相对路径下加载前端静态资源。

在构建应用时，将应用的前端静态资源前缀改为 `/.blocklet/proxy/<blocklet did>`

示例：

```bash
PUBLIC_URL='/.blocklet/proxy/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' npm run build
```

> 你通常不需要手动配置。当你使用 Create Blocklet 创建一个 Blocklet 项目时，已经为你配置好了一切。

### 重定向

我们需要支持在相对路径下后端的重定向可以正常工作

```js
const prefix = req.headers['x-path-prefix'];

res.redirect(`${prefix}path/to`);
```

我们需要支持在相对路径下前端的重定向可以正常工作

```js
const prefix = window.blocklet.prefix;

window.location.href = `${prefix}path/to`;
```

## 区分组件和应用

后端环境

```js
const { env, getWallet } = require('@blocklet/sdk');

// 我是一个应用还是一个组件
env.isComponent;

// 应用和组件的 appId, appName, appDescription, appUrl, mode 相同
env.appId;
env.appName;
env.appDescription;
env.appUrl;
env.mode;
const appWallet = getWallet();

// // 应用和组件的 dataDir, cacheDir 不同
env.dataDir;
env.cacheDir;
```

前端环境

```js
// 我是一个应用还是一个组件
window.blocklet.isComponent;

// 我的挂载点
window.blocklet.prefix;

// 我的挂载点
window.blocklet.prefix;

// 应用的挂载点 (通常是 /)
window.blocklet.groupPrefix;

// 应用中其他组件的挂载点
window.blocklet.componentMountPoints;
```
