---
title: Blocklet 核心概念
description: 了解什么是 Blocklet，Blocklet 实例，Blocklet DID
layout: documentation
---

## What is Blocklet?

- Blocklet 是应用开发、交付、运行的基本单位
- Blocklet 遵循相同的[协议](/reference/blocklet-spec)，享受相同的服务，组合在一起时能完成非常强大的功能
- Blocklet 是可以组合的，组合方式非常类似乐高积木
- Blocklet 的唯一标识是 Blocklet DID，每个 [Blocklet Store](https://store.blocklet.dev) 里面的 DID 是不可重复的

## What is Blocklet Component?

- Blocklet Component 专门指那些能够被组合使用的 Blocklet，能否被组合可以在 [blocklet.yml](/reference/blocklet-spec#Capabilities) 中声明
- Blocklet Component 通常既能独立运行，也能被组合使用，两种模式下表现可以不同
- Blocklet Component 可以[包含其他的 Blocklet Component](/reference/blocklet-spec#Components)，这种包含关系是可以嵌套的，就好比发布在 NPM 的代码库可以依赖其他发布的 NPM 上的代码库。不过从性能的角度出发，Blocklet Component 嵌套的深度是有限制的。

## What is Blocklet Server?

- Blocklet Server 是为 Blocklet 提供完整运行环境、基础服务、管理功能的软件
- Blocklet Server 运行时产生的数据只属于 Blocklet Server 的所有者
- Blocklet Server 的唯一标识是在 Blocklet Server 创建是产生的在其后不可更改的 DID，显示在 Blocklet Server 控制台中
- 任何人可无需许可、无需付费在自己的电脑上运行自己的 Blocklet Server

## What is Blocklet Bundle?

- Blocklet Bundle 是使用 [blocklet bundle](/reference/blocklet-cli#Bundle) 构建得到的，能够被 Blocklet Server 消费的软件包
- Blocklet Bundle 通常会被开发者上传并托管在 [Blocklet Store](https://store.blocklet.dev) 中，也可以托管在任何可以被访问的网络上。
- Blocklet Bundle 通常包含下面两个文件：

```text
.blocklet/release
├── blocklet.json
└── static-demo-blocklet-1.4.0.tgz
```

- `blocklet.json` 根据 [blocklet.yml](/reference/blocklet-spec) 计算出来的 Blocklet 描述文件
- `{name}-{version}.tgz` 包含了 blocklet 运行时需要的各种文件包括构建后的源代码、外部依赖
- 理论上这两个文件可以托管在不同的地方，只要 `blocklet.json` 里面正确包含了压缩包的地址

## What is Blocklet App?

- Blocklet App 是安装、运行在 Blocklet Server 中，且能对外提供服务的实体
- Blocklet App 背后的服务可以由单个或者多个 Blocklet Instance 组成
- Blocklet App 的唯一标识是 appId，通过 [Blocklet SDK](/reference/blocklet-sdk#Environment) 和 [blocklet.js](/reference/blocklet-js) 可以获取
- 运行在不同的 Blocklet Server 中的相同 Blocklet Bundle 属于不同的 Blocklet App
- 运行在相同 Blocklet Server 的相同 Blocklet Bundle 也属于不同的 Blocklet App

## What is Blocklet Instance?

- 运行中的 Blocklet App 中的每个部件都是 Blocklet Instance，就好像根据某个类生成的实例
- 每个 Blocklet Instance 都运行在自己独立的进程中，都有独立的进程标识、环境变量、数据目录
