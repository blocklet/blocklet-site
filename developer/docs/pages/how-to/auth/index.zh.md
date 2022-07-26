---
title: 用户和通行证
description: 用户和通行证
layout: documentation
---

Blocklet Auth Service 为 Blocklet 提供基于 DID 的身份认证和基于通行证的访问控制。

开发者可以通过配置或 API 获取认证和访问控制能力，无需从头实现。

- 获取用户身份
- 获取用户权限
- 设置谁可以访问
- 拦截未认证的请求
- 拦截无权限的请求

你可以通过 [Auth Demo](/samples/auth-demo) 体验上述功能

## 配置 Blocklet Auth Service

在 `blocklet.yml` 中声明的 Web Interface 中进行配置

```yml
# blocklet.yml

interfaces:
  - type: web
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
    # 以下配置和 auth 无关
    protocol: http
    name: publicUrl
    port: BLOCKLET_PORT
    path: /
    prefix: '*'
```

## 登录

用户无需注册即可登录 Blocklet

### 在页面中添加登录组件

```js
import React from 'react';
import { ThemeProvider, createTheme } from '@arcblock/ux/lib/Theme';
import { createAuthServiceSessionContext } from '@arcblock/did-connect/lib/Session';
import Header from '@blocklet/ui-react/lib/Header';

const { SessionProvider } = createAuthServiceSessionContext();

const theme = createTheme();
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <Header />
      </SessionProvider>
    </ThemeProvider>
  );
}
```

更多：[Blocklet UI](/development/blocklet-ui-usage)

### 使用默认的登录页

设置 `blockUnauthenticated` 为 `true` 时，未登录的请求将会自动被拦截至默认的登录页

### 查看用户

用户登录 Blocklet 后，Blocklet Auth Service 会记录该用户的身份信息。

开发者可通过 Blocklet SDK 查询用户信息

- [getUser()](/reference/blocklet-sdk#getuser)
- [getUsers()](/reference/blocklet-sdk#getusers)
- [getOwner()](/reference/blocklet-sdk#getowner)

## 用户权限和通行证

Blocklet Auth Service 采用基于角色的权限控制 [RBAC](https://en.wikipedia.org/wiki/Role-based_access_control)

与传统权限控制系统不同的是，用户的角色不是保存在服务端，而是保存在用户自己的钱包中。

Blocklet 授予用户角色的方式是为用户颁发通行证，通行证中记录了用户的角色。用户在登录时提供对应的通行证以获得操作资源的权利。

开发者可通过 [Blocklet SDK](/reference/blocklet-sdk#auth) 创建角色，管理角色的权限。

创建角色即创建通行证。

Blocklet 使用者可在 Blocklet 控制台 中为用户颁发和管理通行证。

Blocklet 有 4 个默认的通行证 (开发者无需通过 API 创建即可使用)

- `owner`: 只有 Blocklet 所有者会获得此通行证。Blocklet 所有者是安装并首次启动 Blocklet 的那个人。
- `admin`: 建议将此通行证颁发给 Blocklet 的管理者
- `member`: 建议将此通行证颁发给 Blocklet 的内部成员
- `guest`: 通常不需要为访客颁发通行证，如果需要可以颁发此通行证

## 访问控制

- 一个请求到达 blocklet 前会经过 Blocklet Service
- 开发者可以在 blocklet.yml 中声明 Blocklet Service 中的默认配置，使用者在安装 blocklet 后，也可以在 Blocklet Dashboard 中修改默认配置
- 开发者也可以在代码中实现对 Blocklet 的访问控制
- 如果一个 blocklet 包含多个组件，可以分别为每个组件配置访问控制

![](./images/access-control.svg)

### 访问控制类型

- 公开访问
- 非公开访问
  - 登录后可访问
  - 被邀请的人(内部成员)可访问
  - 指定通行证可访问
  - 只有所有者可访问

### 设置 Blocklet Service 中的访问控制

| 权限                       | 开发者在 blocklet.yml 中配置          | 使用者是否可配置 |
| -------------------------- | ------------------------------------- | ---------------- |
| 公开访问                   | 设置 `whoCanAccess` 为 `all`          | 是               |
| 登录后可访问               | 设置 `blockUnauthenticated` 为 `true` | 否               |
| 被邀请的人(内部成员)可访问 | 设置 `whoCanAccess` 为 `invited`      | 是               |
| 指定通行证可访问           | /                                     | 是               |
| 只有所有者可访问           | 设置 `whoCanAccess` 为 `owner`        | 是               |

### 设置指定的 URL 为公开访问

如果 Blocklet 被设置为非公开访问，但是开发者希望将某些 URL 设置为公开访问，可在 `blocklet.yml` 中通过 `ignoreUrls` 来设置：

```yml
ignoreUrls:
  - /api/** # 所有 /api 路径下的 url 可公开访问
  - /public/** # 所有 /public 路径下的 url 可公开访问
  - /path/to # # 设置指定的 url 公开访问
```

**为 DID Connect URLs 设置公开访问**

如果 Blocklet 服务端中有 DID Connect API, 开发者需要把 DID Connect API 设置为公开访问。因为钱包在于 Blocklet 通信时不会携带认证信息。

```yml
ignoreUrls:
  - /api/did/** # 如果 Blocklet 中的 DID Connect API 挂载在 /api/did 下
```

### 在代码中实现访问控制

开发者可使用 Blocklet SDK 中提供的中间件在代码中实现访问控制，详见 [Middleware](/reference/blocklet-sdk#access)
