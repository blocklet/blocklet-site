---
title: Develop Blocklet
description: Develop Blocklet
layout: documentation
---

## 启动开发

#### 1. 在 `blocklet.yml` 中配置启动命令

```yml
scripts:
  dev: npm run start
```

`scripts.dev` 可以配置为任意命令

#### 2. 在项目根目录下执行 `blocklet dev`

启动完成后，你将在终端中看到 blocklet 的访问地址

**示例：**

```
✔ Blocklet xxxxxxx@x.x.x was successfully started

ℹ You can access with the following URL

- http://xxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.did.abtnet.io
```

<!-- blocklet dev install/start/remove 打算废弃 https://github.com/ArcBlock/blocklet-server/issues/5165 -->

## 停止开发

启动开发后，在终端中按下 `CTRL + C` 停止开发

## 获取运行模式

通过 Blocklet SDK 获取 Blocklet 当前的运行模式

见 [Blocklet SDK: Environment](/reference/blocklet-sdk#mode)

## 清空数据

停止开发 blocklet 后，blocklet 的持久化数据并不会被自动清空。

你可以通过 `blocklet dev clear` 清空 blocklet 的所有数据

## Blocklet Types

见 [blocklet.yml: Types](/reference/blocklet-spec#types)

## 配置环境变量

blocklet 启动后可以通过 process.env.XXX 获取在 blocklet.yml 中声明的环境变量

示例：

```yml
environments:
  - name: KEY_1
    description: 'description for KEY_1'
    default: ''
    required: false
    secure: false
    shared: true
```

- `name`: 变量名
- `description`: 变量描述
- `default`: 默认值
- `required`: 是否必填
- `shared`: 对客户端和组件是否可见
- `secure`: `secure` 为 `true` 的环境变量会被加密存储，且对被客户端和组件不可见。

## 在 .env 文件中配置环境变量

开发 blocklet 时，开发者可在项目根目录中的 `.env` 或 `.env.development` 文件中设置环境变量

注意：`.env` 或 `.env.development` 中只能设置 blocklet.yml 声明的环境变量

示例：

```
# .env

KEY_1=value1

```

> blocklet 安装后，使用者可以在 blocklet 管理面板中配置环境变量

## 在页面中获取 blocklet 信息

你可以通过请求 blocklet 的 `__blocklet__.js` 接口获取 blocklet 信息

> 通过 Create Blocklet 创建的 blocklet 项目提供开箱即用的环境，你可以通过 window.blocklet 获取应用信息

```js
// 应用 ID
window.blocklet.appId

// 应用版本
window.blocklet.version

// 应用名称
window.blocklet.appName

// 应用描述
window.blocklet.appDescription

// 应用 Url
window.blocklet.appUrl

// 共享的环境变量
window.blocklet.<shared env>
```

## Blocklet Scripts

Blocklet Server 提供了 hook 功能用来在执行生命周期的过程中做一些事情。目前包含 `pre-install, post-install, pre-start, post-start, pre-stop, pre-uninstall, pre-config` 这几个 Hook.

见 [blocklet.yml: Scripts](/reference/blocklet-spec#scripts)

## 在 blocklet 环境中运行脚本

开发 blocklet 时, 有时我们想在 blocklet 环境下执行脚本（比如建立一些测试数据）。

可以通过执行 `blocklet exec` 实现，比如

```
blocklet exec mock/test.js
```

```js
// mock/test.js

const { env } = require('@blocklet/sdk');
const { getWallet } = require('@blocklet/sdk');

console.log(env);
console.log(getWallet().address);
```

## 如何在升级期间进行迁移

当 blocklet 的持久化存储的数据结构发生不兼容改变时，我们可以使用 migration 脚本来完成自动数据迁移。

**方法：**

在 blocklet 根目录下创建 `migration` 目录

在 `migration` 目录中创建 migration 文件，文件名为 semver version, 比如 `1.0.1.js`

**举例：**

migration 目录中有 `1.0.0.js`, `1.0.1.js`, `1.1.0.js` 3 个文件

当 blocklet 从 1.0.0 升级至 1.2.0 时，会执行 `1.0.1.js`, `1.1.0.js` 这两个 migration scripts

:::Alert{type=warning}
警告：需要将 migration 文件夹添加到 `blocklet.yml` 文件中的 `files` 字段中，如下所示：
:::
```yml
files:
  - ...
  - migration
```
