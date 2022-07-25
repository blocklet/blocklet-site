---
title: Blocklet
description: Blocklet
layout: documentation
---

## Blocklet 是什么？

Blocklet 是一类能运行在 [Blocklet Server](/introduction/blocklet-server) 中的应用集合。

- 可以是一个 Reactjs 应用，由 CRA 创建的
- 可以是一个 Vuejs 应用，由 vite 创建的
- 还可以是一个 express 应用
- 甚至还可以是一个 PHP 或 GO 语言的应用

简单的来说，任何应用都可以转变为一个 Blocklet 应用，并能运行在 Blocklet Server 中。


## 可组合的 Blocklet
在常见的开发模式中，一个应用通常是以独立的形式进行开发的，当应用需要与其他的应用进行连通互动时，需要通过配置了 CORS 的接口来交互。可想而知，这会破坏开发的一体性，也会加大生产环境的部署难度。

而如果你选择了开发 Blocklet，你可以以一种更轻松的模式去开发组合型的应用，开发完成后也可以轻松的将多个应用组合在一起使用，让它们看起来就像是一个应用。

## 快速上手
详细文档查看 [这里](/development/getting-started)
