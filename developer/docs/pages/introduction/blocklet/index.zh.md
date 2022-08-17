---
title: Blocklet 介绍
description: Blocklet 介绍
layout: documentation
---

## Blocklet 是什么？

Blocklet 是一类能运行在 Blocklet Server 中的应用集合。

- 可以是一个 Reactjs 应用，由 CRA 创建的
- 可以是一个 Vuejs 应用，由 vite 创建的
- 可以是一个 express 应用
- ......

简单的来说，任何应用都可以转变为一个 Blocklet 应用，并能运行在 Blocklet Server 中。

### 可组合的 Blocklet

在常见的开发模式中，一个应用通常是以独立的形式进行开发的，当应用需要与其他的应用进行连通互动时，需要通过配置了 CORS 的接口来交互。可想而知，这会破坏开发的一体性，也会加大生产环境的部署难度。

而如果你选择了开发 Blocklet，你可以以一种更轻松的模式去开发组合型的应用，开发完成后也可以轻松的将多个应用组合在一起使用，让它们看起来就像是一个应用。

## Blocklet Server 是什么？

Blocklet Server 是 Blocklet 的托管平台，它为 Blocklet 提供了运行环境和基础服务。

## Blocklet Service 是什么？

Blocklet Service 是 Blocklet Server 为 Blocklet 提供的一系列服务，Blocklet Server 通过 Blocklet Service 为 Blocklet 提供了大量的开箱即用的特性。

- 域名：每个 Blocklet 可通过独一无二的 DID Domain 访问
- 身份验证服务：基于 DID 的身份验证服务
- 权限管理服务：基于 DID Passport 和 RBAC 的权限管理服务
- 消息通知服务：Blocklet 可以给 DID 钱包发送消息

## 什么是 Blocklet 商店？

Blocklet 商店是 Blocklet 的发行平台。Blocklet 商店允许您发现、购买和安装 Blocklets.

ArcBlock 官方提供了 2 个 Blocklet 商店：

1. [https://store.blocklet.dev](https://store.blocklet.dev)：提供生产就绪的 Blocklet
2. [https://dev.store.blocklet.dev](https://dev.store.blocklet.dev)：提供样本/演示 Blocklet，用于学习和体验

**Blocklet 商店是去中心化的，你可以在自己的 Blocklet Server 部署你自己的 Blocklet 商店！**

## 快速上手

详细文档查看 [这里](/development/getting-started)
