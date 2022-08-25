---
title: Blocklet Meta
description: Blocklet Meta
layout: documentation
---

## DID

Bloklet DID 表示 Blocklet 打包后的 Bundle ID，通过 `name` 和 `did` 指定。

```yml
name: example
did: z8iZrkWYbi3JU3AP9NHJQbBUdrgiRbeorauqf
```

`name` 为人类可读的 ID, `did` 通过 `name` 派生。唯一的 `name` 派生出唯一的 `did`.

**通常不应该手动修改 `did`, 应该通过 `create-blocklet` 初始化项目时自动生成 `name` 和 `did`.**

上传到 Blocklet Store 时，相同的 DID 表示相同的 Bloklet.

将 Blocklet 安装到 Blocklet Server 时，相同的 DID 表示相同的 Bloklet.

_定义 Blocklet 名称请使用 title, 不要使用 name_

`name` 遵循 NPM Package Name 规范

- blocklet name length should be greater than zero
- all the characters in the blocklet name must be lowercase i.e., no uppercase or mixed case names are allowed
- blocklet name can consist of hyphens
- blocklet name must not contain any non-url-safe characters (since name ends up being part of a URL)
- blocklet name should not start with . or \_
- blocklet name should not contain any spaces
- blocklet name should not contain any of the following characters: ~)('!\*
- blocklet name length cannot exceed 214

## Version

`version` 遵循 [semver version](https://semver.org/) 规范

```yml
version: 1.0.0
```

## Infomation

```yml
title: Example Demo
description: Demo blocklet that shows how to configure Blocklet Meta`
author:
  name: Bob
  email: bob@gmail.com
  url: 'https://bob.me'
contributors:
  - name: Alice
    email: alice@gmail.com
    url: 'https://alice.me'
maintainers:
  - name: Zhangsan
    email: zhangsan@gmail.com
    url: 'https://zhangsan.me'
community: 'https://github.com/orgs/blocklet/discussions'
documentation: 'https://developer.blocklet.io/docs'
homepage: 'https://www.blocklet.io'
license: MIT
keywords:
  - demo
  - example
  - blocklet
repository:
  type: git
  url: 'git+https://github.com/blocklet/blocklet-site.git'
support: support@arcblock.io
```

## Logo

应用 logo 文件

```yml
logo: logo.png
```

## Screenshots

图片介绍，会展示在 store 的介绍页中

```yml
screenshots:
  - 0.png
  - 1.png
  - 2.png
```

## Price

Blocklet 价格

```yml
payment:
  price: # 可以指定多个币种
    - address: z35n6UoHSi9MED4uaQy6ozFgKPaZj2UKrurBG # token address
      value: 8 # 价格
  share: # 分成
    - name: Bob # 账号别名
      address: z1QUDFzp6wKhLFjV4sG1ACY3J3ePcknrviy # 账号 DID
      value: 0.7 # 分成比例
    - name: Store # 账号别名
      address: zNKr4EeqcMk4W4TpBYD7MzGj6UEua53vJFx1 # 账号 DID
      value: 0.3 # 分成比例
```

## Files

需要将哪些文件打包到 bundle 中

```yml
files:
  - logo.png
  - screenshots
  - hooks
```

## Interfaces

Blocklet 访问接口（ 以下大部分配置不需要关注，只关注 auth 的配置即可 ）

```yml
interfaces:
  - type: web # 访问接口类型
    services:
      - name: auth # 该访问接口的 Auth 服务
        config:
          whoCanAccess: all # 谁可以访问 (可以在应用安装后动态修改)
          blockUnauthenticated: false # 是否自动拦截未登录的请求, 并跳转到登录页 (默认: false)
          blockUnauthorized: false # 是否自动拦截未授权的请求 (默认: false)
          allowSwitchProfile: true # 是否支持切换 Profile (默认: true)
          profileFields: # 登录时需要提供的信息
            - fullName
            - email
            - avatar
          ignoreUrls: [] # 哪些接口允许任何请求访问
    protocol: http # 访问接口类型
    name: publicUrl # 通常不需要修改
    port: BLOCKLET_PORT # 接收端口的环境变量 (端口号由 Blocklet Server 生成)
    path: / # Bloclet 接收请求时的默认前缀
    prefix: '*' # Blocklet 被挂载的前缀
```

## Environments

运行时环境变量

```yml
environments:
  - name: key # 变量名称
    description: xxxx # 变量描述
    default: '' # 默认值
    required: false # 是否必填
    secure: false # 是否是敏感信息
    shared: true # 是否公开。默认为 true, 当 secure 为 true 时 shared 必为 false
```

## Scripts

配置 Blocklet Hook 指令

```yml
scripts:
  dev: npm run start # 执行 `blocklet dev` 时实际执行的指令
  preInstall: node hooks/pre-install.js # 安装前的 hook
  preDeploy: node hooks/pre-deploy.js # 部署前的 hook (以部署方式安装 `blocklet deploy`)
  postInstall: node hooks/post-install.js # 安装后的 hook
  preStart: node hooks/pre-start.js # 启动前的 hook
  preStop: node hooks/pre-stop.js # 停止前的 hook
  preUninstall: node hooks/pre-uninstall.js # 删除前的 hook
```

![blocklet lifecycle](./images/blocklet-lifecycle-hooks.png)

Blocklet Server 提供了 hook 功能用来在执行生命周期的过程中做一些事情。目前包含：`pre-deploy, post-install, pre-start, pre-stop, pre-install, pre-uninstall` 这几个 Hook.

比如，某个 Blocklet 对于运行的机器有硬件要求：内存不能低于 1G，可用磁盘容量不能低于 500 MB。这个时候就可以利用 pre-install hook 来检测目标机器是否已满足需求，如果满足，正常安装，否则抛出错误消息，并终止安装。

hook 其实是一些 Shell 脚本，而这些脚本可能会引用 Blocklet 中的文件，而在打包 Blocklet 的过程中，Blocklet Server 打包工具(Blocklet Server CLI)会将 hook 用到的文件单独打包，所以，开发者需要在 `hookFiles` 中声明哪些文件被 hooks 引用了。

## Requirements

配置所需资源和运行环境限制

```yml
requirements:
  server: '>=1.8.0' # server 版本约束
  os: '*'
  cpu: '*'
  fuels: # 启动前需要的燃料 (token)
    endpoint: xxx # 链的地址
    adress: xxx # token address
    value: xxx # 价格
    reason: xxx # 需要的原因 （ 比如因为首次启动前需要创建 NFT Factory ）
```

#### 指定启动前所需燃料 (token)

```yml
requirements:
  fuels:
    endpoint: xxx # 链的地址
    adress: xxx # token address
    value: xxx # 价格
    reason: xxx # 需要的原因 （ 比如因为首次启动前需要创建 NFT Factory ）
```

#### 指定最低的 Blocklet Server 版本号

```yml
requirements:
  server: '>=1.8.0' # server 版本必须大于等于 1.8.0
```

## Capabilities

```yml
capabilities:
  clusterMode: false # Can blocklet be started in cluster mode
  component: true # Can blocklet become a component and be composed by other blocklets
```

## Children

Demo: [Component Demo](https://github.com/blocklet/component-demo/blob/main/blocklet.yml)

```yml
children: # 通常不需要手动维护，通过 `blocklet add/remove` 维护即可
  - name: xxx # 人类可读的 ID (必填)
    source: # 安装源
      # 通过 url 安装
      url: xxx
      # 通过 store 安装
      store: xxx # store 地址
      name: xxx # Blocklet ID
      version: xxx # Blocklet 版本
    mountPoint: /path/to # 挂载点
    title: xxx # 名称
    description: xxx # 描述
```

#### 配置 Source

```yml
children:
  - name: c1
    mountPoint: /c1

    # source 有两种类型

    # 1. url: 相当于之前的 resolved, 可以为任意 bundle url, 不需要在 store 中 serve, 比如
		# 可以 serve 在 github release 中，也可以在本地磁盘中
    source:
      url:
				- https://store.blocklet.dev/api/blocklets/z8ia4e5vAeDsQEE2P26bQqz9oWR1Lxg9qUMaV/blocklet.json
				- file:///Users/wangshijun/Develop/arcblock/nft-store/.blocklet/release/blocklet.json
  - name: c2
    mountPoint: /c2
    # 2. 在 store 中 serve 的 bundle, 可以控制版本：可指定最新版本（默认）或固定版本。之后若需要可以支持更多形式 `^x.x.x`, `~x.x.x` 等
    # 因为 store 是去中心化的，所以需要指定 store
    source:
      store: https://store.blocklet.dev
      name: static-demo # bundle name
      version: latest # latest, 1.3.0
  - name: c3
    mountPoint: /c3
    # url 可以设置一个或多个，当第一个 url 异常时，可降级到后面的url
    source:
      url:
        - <primary url>
        - <redundant url>
  - name: c4
    mountPoint: /c4
    # store 可以设置多个，当第一个 store 异常时，可降级到后面的 store
    source:
      store:
        - https://store.blocklet.dev
        - https://another-store.blocklet.dev
      name: static-demo
      version: latest
```

## Navigation, Theme, Copyright

```yml
navigation: # 导航信息（ 应用地图 ）
  - title: xxx 名称
    # 链接到某个 url
    link: xxx
    # 链接到子组件
    child: xxx # child name or child did
    section: # 希望在哪里展示
      - header
      - footer
    icon: mdi:home # 图标
theme: # 主题
  background: '#f5f5f5' # 背景色
copyright: # 版权信息
  owner: Arcblock # 所有者
  year: 2022 # 如不写则取当前年份
```

比较完整的例子：[Component Demo](https://github.com/blocklet/component-demo/blob/main/blocklet.yml)

#### 支持 i18n

```yml
title: xxx
```

或

```yml
title:
	zh: xxx
	en: xxx
```

#### header 和 footer 展示不同信息

```yml
navigation:
	- title: a # 出现在 header 中（默认）
	- title: c
	  section: footer # 只在 footter 中
	- title: d
	  section: # 既在 header 也在 footer 中
      - header
      - footer
	- title: e
	  section: social # 在 footer 的 social media 中
	- title: f
	  section: bottom # 在 footer 的最下方
```

#### 展示 icon

```yml
navigation:
	- title: a
	   icon: mdi:home # iconify 风格
	- title: a
	   icon: 'https://xxx' # url
	- title: b
	   icon: '/path/to/xxx' # icon serve 在 app 中
```

#### 展示 copyright

```yml
copyright:
	owner: xxx
	year: xxx # 如不写则取当前年份
```

#### 不同的 background

```yml
background: xxx
```

或

```yml
background:
	header: xxx
	footer: xxx
	default: xxx
```

## Types

通过 `group` 和 `main` 配置 Blocklet 的类型和启动入口

Blocklet 有三种类型

### Type: Dapp

包含后端服务的 Blocklet

```yml
group: dapp
main: api/index.js # 启动文件
```

### Type: Static

只包含静态 Web 资源的 Blocklet

```yml
group: static
main: dist # 静态资源的路径，需要确保 dist/index.html 存在
```

### Type: Gateway

这类 Blocklet 本身不会包含任何代码和服务，只会将其他 Blocklet 组合在一起

```yml
group: gateway
```

## Others

```yml
timeout:
  start: 60 # 启动超时时间。单位：秒。默认时间： 1 分钟。
```
