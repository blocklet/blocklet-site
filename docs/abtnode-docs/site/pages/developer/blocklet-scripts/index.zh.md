---
title: 'Blocklet 生命周期钩子'
description: 'Blocklet 生命周期钩子'
keywords: 'blocklet server, blocklet'
author: 'wangshijun'
category: ''
layout: 'documentation'
tags:
  - 'blocklet server'
---

目前 Blocklet Server 支持下面这些生命周期钩子:

- `pre-deploy`: 在 Blocklet 部署到 Blocklet Server 前被调用，会在本地执行各种构建工作。如果此生命周期钩子的退出代码非 0，则会退出此次部署
- `post-install`: 在 Blocklet 安装结束时被调用，可以在本生命周期钩子中执行一些操作。如果退出代码非 0，安装将失败
- `pre-stop`: 在 Blocklet 结束前被调用，可以在这个生命周期钩子中做一些操作，比如退出一些与此 Blocklet 相关的进程。如果此钩子退出代码非 0，将会继续停止，但同时会打印错误日志
- `pre-install`: 在 Blocklet 被安装前调用，可以用来检查当前的运行环境符合不符合安装需求。如果此钩子退出代码非 0，这安装将会失败
- `pre-start`: 在 Blocklet 启动前会被调用，比如检查当前 Blocklet 依赖的模块是否已经启动等。如果此钩子退出代码非 0，将会不被允许启动，但同时会打印错误日志
- `pre-uninstall`: 在 Blocklet 安装前被调用，比如检查当前 Blocklet 依赖的模块是否已经在运行等。如果此钩子退出代码非 0，将会继续安装，但同时会打印错误日志

### Hook 文件

如果 Hook 依赖于项目中的文件，需要在 `blocklet.json`(或者 `package.json` 中的 `blocklet.hookFiles` 里) 定义这些文件的相对路径。

### 异常处理

如果 Blocklet 中有发生异常，可以将其统一处理，以便 Blocklet Server 更加优雅的处理它们。

如果你的 hook 是用 Node.js 实现的，我们提供了一个 `abtnode/js-util` 工具来捕捉 `unhandledRejection` 和 `unhandledRejection` 异常，你只需在项目中导入下面的代码：

```js
import '@abtnode/util/lib/error-handler';
```
