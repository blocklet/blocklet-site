---
title: 创建应用
layout: documentation
---

## 应用类型

根据常用的开发模式，大致可以将所有的应用划分为三类：静态站点项目、后端 API 服务项目、全栈项目。

每一种应用有一些什么特征呢？

### 静态站点项目
静态站点项目通常只会包含一些前端项目的文件，其项目本身可以通过一个静态资源服务器来进行部署。常见的属于这个类型的应用有 `React`、`Vue`、`Svelte`、`Solidjs` 等。

[create-blocklet](http://www.createblocklet.dev/zh) 是 Blocklet 平台官方维护的一个命令行工具，主要用于快速的创建一个 Blocklet 应用。

在 create-blocklet 中，提供了以下静态站点项目模板的快速创建功能：
- [static] html
- [static] react
- [static] vue3 + vite
- [static] vue2 + @vue/cli
- [static] solidjs
- [static] svelte
- [static] blocklet pages
- [static] doc site

### 后端 API 服务项目

后端 API 服务项目通常是用于作为提供 API 调用的服务而存在，一般常用于为静态站点项目、手机APP客户端等提供数据之用。

在 Create Blocklet 中，提供了以下后端 API 服务项目模板的快速创建功能：
- [api] express.js

### 全栈项目
全栈项目集静态站点项目和后端 API 服务项目之和，将两者融合在一起，在一个项目中提供了更完整的服务。通常情况下，当你需要一个功能完备的站点，那么选择全栈项目就没错了。

在 Create Blocklet 中，提供了以下全栈项目模板的快速创建功能：
- [dapp] react + express.js
- [dapp] vue3 + express.js
- [dapp] vue2 + express.js
- [dapp] solidjs + express.js
- [dapp] svelte + express.js
- [dapp] react + gun.js + express.js
- [dapp] next.js

## 使用 create-blocklet 工具创建一个 Blocklet 项目

通过 `blocklet create` 命令来可以调用以上工具来快速创建一个 Blocklet 应用（前提在本机中有安装 [blocklet-server](/prerequisites/server) 环境）

![Step 1](./images/step-1.jpg)

输入项目名称后，即可进入选择模板的阶段，在这个页面中可以输入关键字进行搜索。

使用空格键选中需要创建的模板（可以选择多个模板，会自动组合成一个 monorepo）

![Step 2](./images/step-2.jpg)

接下来选择 `[static] react` 作为示例

![Step 3](./images/step-3.jpg)

程序会自动创建好对应模板的目录结构，根据其提示的信息进行依赖的安装即可进入项目的开发模式。

想要了解更多有关 `create-blocklet` 的信息，可以参考 [create-blocklet](http://www.createblocklet.dev/zh)

## 在已有项目的基础上创建一个 Blocklet 项目

以上的内容已经介绍了从 0 开始创建一个 Blocklet 的过程，Create Blocklet 可以帮我们免去复杂的创建流程。

然后有时候我们还面临着，项目已经处于开发过程中，需要将一个项目转变为 Blocklet，以下内容将会介绍如何将一个已经开发好（或开发中）的项目转变为 Blocklet 项目

### 依赖准备

在本机中有安装 [blocklet-server](/prerequisites/server) 环境

### 生成 `blocklet.yml` 文件

进入项目的目录中，在终端执行 `blocklet init` 命令，依次输入项目名称、项目描述

![Step 1](./images/add-step-1.jpg)

在选择项目类型的步骤中，如果当前项目是一个“静态站点项目”，则选择 `static`；如果当前项目是一个“后端 API 服务项目”或“全栈项目”，则选择 `dapp`

![Step 2](./images/add-step-2.jpg)

接着根据后续的步骤，依次确认即可生成项目对应的 `blocklet.yml` 文件

### 配置脚本命令

在上面的步骤中，我们已经得到了一个可用于 Blocklet Server 的 `blocklet.yml` 文件，接下来我们配置一些脚本命令使我们可以更快捷的使用 Blocklet Server 进行开发及打包部署。


1. **配置 `blocklet.yml` 中的开发命令**

   启动一个 Blocklet 应用的开发环境需要通过 `blocklet dev` 命令来实现，而 `blocklet dev` 命令依赖于 `blocklet.yml` 中的配置。

   需要在 `blocklet.yml` 中增加配置如下：
   ```yaml
   scripts:
     dev: npm run start
   ```

   为了使用更熟悉的方式调用开发命令，也可以在 `package.json` 文件中的 `scripts` 增加 `"dev": "blocklet dev"` 命令，之后便可以使用 `npm run dev` 来进入 Blocklet 应用的开发环境

   想要了解更多有关 `blocklet dev` 的信息，可以参考 [blocklet dev](/reference/blocklet-cli#Develop)
2. **配置打包命令**

   我们可以通过 `blocklet bundle` 命令进行 Blocklet 应用的打包，在执行命令前需要使用项目原有的命令进行一次打包。

   假设项目原有的打包命令为 `npm run build`，则我们可以在 `package.json` 文件中的 `scripts` 增加 `"bundle": "npm run build && blocklet bundle --create-release"` 命令，以后我们便可以通过 `npm run bundle` 来快速进行 Blocklet 应用的打包

   想要了解更多有关 `blocklet bundle` 的信息，可以参考 [blocklet bundle](/reference/blocklet-cli#Bundle)
3. **配置部署命令**

   在 `package.json` 文件中的 `scripts` 增加 `"deploy": "npm run bundle && blocklet deploy"`，之后便可以通过 `npm run deploy` 命令进行一键打包及部署

   想要了解更多有关 `blocklet deploy` 的信息，可以参考 [blocklet deploy](/reference/blocklet-cli#Deploy)
4. **配置发布命令**

   在 `package.json` 文件中的 `scripts` 增加一项 `"upload": "npm run bundle && blocklet upload"`，之后便可以通过 `npm run upload` 命令进行一键打包及发布

   想要了解更多有关 `blocklet upload` 的信息，可以参考 [blocklet upload](/reference/blocklet-cli#Upload)
