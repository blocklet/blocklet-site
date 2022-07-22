---
title: Blocklet 规范
description: 'Blocklet 规范'
keywords: 'blocklet server,blocklet,specification'
author: zhenqiang
category: ''
layout: documentation
tags:
  - 'blocklet server'
  - blocklet
  - specification
---

## 什么是 Blocklet？

Blocklet 是一种应用协议，同时也是一种软件架构。作为一个协议，它描述了构建 Blocklet Server 平台的方式；作为一个软件架构, 一个独立的 Blocklet 是一个可重用的软件模块，可能是一个 HTTP 服务，也可能是一个函数库等等；当多个 Blocklet 在一起运行时，需要一个平台将它们组合起来，共同构成一个独立的服务，比如 Blocklet Server （Blocklet Server）。

## 如何定义 Blocklet？

我们用 JSON 数据格式来描述 Blocklet 的协议。

## 定义基本信息

```json
{
  "name": "blocklet name, can be same as npm package name",
  "description": "blocklet description, can be same as npm package description",
  "version": "blocklet version, can be same as npm package version",
  "group": "only `dapp|static` are allowed and supported"
}
```

name, description, version, group 描述了 Blocklet 的基本信息。其中，group 分为 `dapp` 和 `static` 两种类型。`dapp` 就是常规的 dapp，static 是一中只包含了前端静态资源的 Web 应用，Blocklet Server 内部会用一个 HTTP Server 来 serve `static` Blocklet.

## 定义运行时设置

```json
{
  "main": "the entrypoint to bundle the blocklet or the static folder",
  "requiredEnvironments": {
    "name": "string, name of the environment",
    "description": "string, description of the environment",
    "required": "bool, is required",
    "default": "Any type, default value"
  }
}
```

除了对 Blocklet 基本信息的描述，Blocklet 还定义了 `main` 这个字段描述 Blocklet 如何开始运行，就是所谓的入口文件的描述。 这个字段和 Blocklet 的运行密切相关。`main` 定义了 dapp 或者 static 类型的 Blocklet 的入口文件或静态资源目录。所以对于 Blocklet Server 来说，`main` 字段是必须的，至关重要，否则 Blocklet Server 没有办法启动 Blocklet.

除了 main 字段，我们还定义了 `requiredEnvironments` 字段用来声明 Blocklet 运行时需要的环境变量。有 4 个属性描述 1 个环境变量：name, description, required, default. 设置为 required 的变量，并且没有提供默认值时，用户必须在启动前设置该变量。

`requiredEnvironments` 不是必须的，Blocklet 需要时可以通过这个字段要求 Blocklet 用户提供相应的信息。比如，Blocklet 依赖 MongoDB 数据库，那么就可以用 requiredEnvironments 来要求用户填写 MongoDB 的连接字符串。

`capabilities` 用来告知 Blocklet Server 当前 Blocklet 的能力，比如如果你的 Blocklet 不能运行在任意动态的路由前缀下面，可以如下设置：

```json
  "capabilities": {
    "dynamicPathPrefix": false
  }
```

## 其他配置

```json
{
  "provider": "arcblock|community",
  "public_url": "public page url, should at least specify one",
  "admin_url": "administrator page url, default to empty",
  "config_url": "configuration page url, default to empty",
  "doc_url": "public document url, if not specified, will use store detail page"
}
```

这里是其他的配置项，对于 Blocklet 来说这些字段是可以选的，我们简单介绍一下这几个字段：

- provider 是声明 Blocklet 的来源，可选值有两个：arcblock|community. `arcblock` 代表 ArcBlock 官方开发的，`community` 是社区开发的。
- public_url 是 Blocklet 可公开访问的地址。
- admin_url 是 Blocklet 管理端地址。
- config_url 是 Blocklet 配置页面地址。
- doc_url 是 Blocklet 的文档地址，如果这个地址不存在，Blocklet Server 会使用 Blocklet 的 README 作为文档页面。

## Blocklet 生命周期

## 生命周期

![blocklet lifecycle](./images/blocklet-lifecycle.png)

在 Blocklet Server 中, Blocklet 完整的生命周期包括 `安装（或部署）、启动、停止、卸载` 这四个阶段。因为可以通过两种方式来安装 Blocklet, 分别是在市场中下载安装，另外一种是直接在本地用 Blocklet Server CLI 部署安装。用 CLI 部署主要是为了开发测试。所以在生命周期的第一阶段中存在安装、部署两种情况。

## Hooks

![blocklet lifecycle](./images/blocklet-lifecycle-hooks.png)

在在这几个阶段中，Blocklet Server 提供了 hook 功能，用来在执行生命周期的过程中做一些事情。目前包含：`pre-deploy, post-install, pre-start, pre-stop, pre-install, pre-uninstall` 这几个 Hook.

比如，某个 Blocklet 对于运行的机器有硬件要求：内存不能低于 1G，可用磁盘容量不能低于 500 MB。这个时候就可以利用 pre-install hook 来检测目标机器是否已满足需求，如果满足，正常安装，否则抛出错误消息，并终止安装。

hook 其实是一些 Shell 脚本，而这些脚本可能会引用 Blocklet 中的文件，而在打包 Blocklet 的过程中，Blocklet Server 打包工具(Blocklet Server CLI)会将 hook 用到的文件单独打包，所以，开发者需要在 `hookFiles` 中声明哪些文件被 hooks 引用了。

## 如何开发 Blocklet？

在了解了一些基础的 Blocklet 概念和协议后，那么怎么开发一个 Blocklet 呢？

## 初始化 Blocklet

Blocklet Server CLI 提供了 `blocklet init` 命令来帮助开发者快速创建一个 Blocklet 项目，这个命令会帮助开发者创建相关的配置文件和目录。

### 代码结构

```shell
├── blocklet.json
├── blocklet.md
└── package.json
```

项目创建完成后，我们可以看到一个 Blocklet 项目主要包含两部分：Blocklet 描述信息和源代码。
Blocklet Server 当前只支持 Node.js 的 Blocklet 项目，所以 Blocklet 的描述信息一般会包含包含两部分：Node.js 的 package.json 和 Blocklet 的 blocklet.json. 我们在前面讲的 Blocklet Spec 的内容会放在 blocklet.json 中。当然，Blocklet 也允许将 blocklet.json 的内容放到 package.json 的 `blocklet` 字段中。

### blocklet.json

Blocklet 所有的描述信息都放在 blocklet.json 文件中。
前面我们说，Blocklet 是一个 Node.js 项目，我们知道，Node.js 的 package.json 文件中也包含 name, description, version 这些信息。对于 Blocklet 来说，这部分重复的信息是等价的，Blocklet Server 会优先读取 blocklet.json 的配置，如果没有，才会去读取 package.json 中的。

如下是 blocklet.json 例子。

```json
{
  "name": "static-demo-blocklet",
  "description": "Demo blocklet that shows how to serve a static html5 game with Blocklet Server",
  "version": "1.0.0",
  "group": "static",
  "color": "primary",
  "main": "app/",
  "provider": "arcblock",
  "requiredEnvironments": {
    "name": "DEBUG",
    "description": "Enable test flag",
    "required": false,
    "default": "arcblock*"
  },
  "capabilities": {
    "dynamicPathPrefix": true
  }
}
```

## Blocklet 环境变量

之后的开发工作就是一个普通的 Web 应用开发了。因为 Blocklet 是运行在 Blocklet Server 之中，所以 Blocklet 会依赖于 Blocklet Server 的环境。Blocklet Server 现在提供了一些环境变量供开发使用。

### 私有环境变量

- BLOCKLET_PORT
- BLOCKLET_APP_DIR
- BLOCKLET_DATA_DIR
- BLOCKLET_LOG_DIR
- BLOCKLET_CACHE_DIR
- BLOCKLET_APP_SK
- BLOCKLET_APP_ID

## 全局环境变量

- ABT_NODE_DID
- ABT_NODE_PK
- ABT_NODE_URL
- ABT_NODE_DOMAIN
- ABT_NODE_PROTOCOL

这些变量都是字面意思，在开发 Blocklet 过程中可以从环境变量中读取这变量的些值。

## 如何打包 Blocklet？

Blocklet 开发完成后需要将代码打包才能进行部署，ABT CLI 提供了 `blocklet bundle` 命令来打包源码。

### 在 Blocklet Server 中测试

在了解 Blocklet 生命周期一节时， 我们提到了部署（Deploy）阶段，这个命令可以将打包好的项目部署到本地 Blocklet Server 中，用来测试 Blocklet。

## 如何发布 Blocklet？

首先，将开发好的 Blocklet 发布到 NPM。`blocklet bundle` 命令会将打包好的代码放到当前目录的 `.blocklet` 目录中，在发布或者测试时，需要将 `.blocklet/bundle` 中代码打包发布。

然后分叉 https://github.com/arcblock/blocklets 仓库，（如果没有 Github 账号的话，需要先注册 Github 账号）。修改项目的 registry.yml 文件，将自己的 Blocklet NPM 包地址放到 registry.yml 列表中。然后给 ArcBlock 的仓库： https://github.com/arcblock/blocklets 提一个 Pull Request。

检查确认没问题后，会将上面创建的 PR 合并到 Blocklet 仓库的主分支，从而完成发布。
