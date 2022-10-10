---
title: Blocklet Meta
description: Blocklet Meta
layout: documentation
---

## 什么是 Blocklet Meta

Blocklet Meta 描述了 Blocklet 的基本信息一些配置信息。

Blocklet Meta 在 `blocklet.yml` 中描述。

本文介绍 Blocklet 运行所需必要配置，完整的配置文档见 [Blocklet Meta](/reference/blocklet-spec)

## DID

```yml
name: example
did: z8iZrkWYbi3JU3AP9NHJQbBUdrgiRbeorauqf
```

Bloklet DID 表示 Blocklet 打包后的 Bundle ID，通过 `name` 和 `did` 指定。

`name` 为人类可读的 ID, `did` 通过 `name` 派生。唯一的 `name` 派生出唯一的 `did`.

**通常不应该手动修改 `did`, 应该通过 `create-blocklet` 初始化项目时自动生成 `name` 和 `did`.**

上到 Blocklet Store 时，相同的 DID 表示相同的 Bloklet.

将 Blocklet 安装到 Blocklet Server 时，相同的 DID 表示相同的 Bloklet.

## 版本

```yml
version: 1.0.0
```

通过 `version` 中指定 Blocklet 版本。

升级 Blocklet 时，可通过 `blocklet version` 命令修改 `blocklet.yml` 中的 `version`

## 名称和描述

```yml
title: Example APP
description: Demo blocklet that shows how to configure Blocklet Meta
```

Blocklet 名称和描述通过 `title` 和 `description` 表示。

`title` 和 `description` 将呈现在页面中，对用户可见。

更多的配置见 [Blocklet Meta: Infomation](/reference/blocklet-spec#infomation)

## 访问入口

```yml
interfaces:
  - type: web
    name: publicUrl
    path: /
    prefix: '*'
    port: BLOCKLET_PORT
    protocol: http
```

Blocklet 对外提供的访问入口在 `interfaces` 中声明

**通常不需要手动修改 `interfaces`, 使用 `create-blocklet` 初始化项目时自动生成的 `interfaces` 即可.**

每一个 Blocklet 必须声明且只能声明一个 Web 访问入口。

`interfaces` 更多配置见 [Blocklet Meta: Interfaces](/reference/blocklet-spec#interfaces)

## Blocklet 类型

Blocklet 有两种类型

- 纯静态: 只包含静态资源。启动时，纯静态的 Blocklet 将被 Blocklet Server 内置的静态资源服务托管
- DAPP: 这类 Blocklet 本身包含后端服务（也可以同时包含静态资源），启动时，DAPP 类型的 Blocklet 将在 Blocklet Server 分配的端口号启动服务

通过 `group` 指定 Blocklet 类型，通过 `main` 指定 Blocklet 启动入口

DAPP 类型的 Blocklet 需要通过 `scripts.dev` 指定 Blocklet 开发环境启动入口

纯静态类型：

```yml
group: static
main: www
```

DAPP 类型：

```yml
group: dapp
main: index.js
scripts:
  dev: npm run dev
```

更多的类型见 [Blocklet Meta: Type](/reference/blocklet-spec#types)
