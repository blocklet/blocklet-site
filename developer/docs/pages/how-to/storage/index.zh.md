---
title: Blocklet Storage
description: Blocklet Storage
layout: documentation
---

## Using local database

### Local Storage

你可以使用 Blocklet SDK 获取 blocklet 的存储目录

```js
const fs = require('fs');
const { env } = require('@blocklet/sdk');

fs.writeFileSync(path.join(env.dataDir, 'data.txt'), 'blocklet data');
```

### File Database

Blocklet SDK 为 blocklet 提供一个基于文件的数据库

见 [Blocklet SDK: Database](/reference/blocklet-sdk#database)

<!-- ## Using browser database -->

<!-- ## Using Remote database -->

<!-- ## Using decentralized data store -->

## Using ORM 

### Prisma + sqlite

#### 先决条件

本指南需要 Node.js v14.17.0 或更高版本（了解有关[系统要求](https://www.prisma.io/docs/reference/system-requirements)的更多信息）。

#### 1. 初始化 prisma 

第一步，在你的项目安装 `prisma` 依赖

```shell
yarn add prisma -D
```

执行以下命令初始化 `prisma`，并使用 SQLite 作为你的数据库

```
npx prisma init --datasource-provider sqlite
```

此时，项目根目录下会生成一个新的 `prisma` 目录 和 `.env` 文件，并将 SQLite 配置为你的数据库。

#### 2. 数据库建模

我们现在需要数据库进行建模，以描述我们存储的数据。

添加用户模型到文件 `prisma/schema.prisma` 中，添加后的内容如下:

```typescript
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

// 添加用户模型
model User {
  id    String  @id @default(uuid())
  email String  @unique
  name  String?
}
```

如果你使用的开发工具是 vscode，你可以安装 [prisma 插件](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) 以在建模的时候获得更好的编码体验。

你可以使用 `npx prisma format` 命令帮助你格式化 `schema.prisma` 文件，并校验出发生错误的位置。

#### 3. 创建数据库和数据表

此时，你已经有了数据库的模型了，但是还没有创建数据和数据表。需要运行以下命令以创建数据库和数据表:

```shell
npx prisma migrate dev --name init // 只在本地环境执行
```

这个命令做了两件事：

1. 它会在目录中为此迁移创建一个新的 SQL 迁移文件 `prisma/migrations`。
2. 它针对数据库运行 SQL 迁移文件。

因为 SQLite 数据库文件以前不存在，所以该命令还在 `prisma` 目录中创建了它，其名称 `dev.db` 通过 `.env` 文件中的环境变量定义。

恭喜，您现在已创建好数据库和数据表。现在让我们开始学习如何使用 `Prisma Client` 操纵数据。

#### 4. 使用 Prisma Client 操纵数据

```typescript
app
```

#### 5. 可视化查看 Prisma 中的数据

```shell
npx prisma studio
```

#### 6. 部署到正式环境

```shell
npx prisma migrate deploy // pre-install hooks
```

