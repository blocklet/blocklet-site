---
title: Blocklet CLI
description: Blocklet CLI
layout: documentation
---

Blocklet CLI 提供了用于控制和管理 Blocklet 的 `blocklet` 命令行工具。 使用以下语法从终端运行 `blocklet` 命令：

```bash
$ blocklet [options] [command]
```

您可以使用 `-h` 或 `--help` 来确定支持的命令的完整列表。

## 版本

显示当前的 Blocklet CLI 版本。

```bash
$ blocklet -V
1.4.4
```

## 创建 Blocklet 项目

创建一个 Blocklet 项目。 该命令使用 [create-blocklet](https://www.createblocklet.dev/docs) 生成项目。详见 [Create Blocklet](https://www.createblocklet.dev/docs)

```bash
$ blocklet create
```

## 开发 blocklet

### 开发

从当前目录开发 Blocklet

```bash
$ blocklet dev

ℹ Try to dev blocklet from xxxxxxxx

ℹ Node DID from config xxxxxx
ℹ Node config from xxxxxx
✔ Installing blocklet-developer-docs@0.1.0... Done in 0.31s
✔ Blocklet blocklet-developer-docs@0.1.0 was successfully installed

...

✔ Blocklet blocklet-developer-docs@0.1.0 was successfully started

ℹ You can access with the following URL

- http://xxxxxx-xxxxxxxxxxxxxxxxxxxx.did.abtnet.io
```

在 Blocklet 启动后打开浏览器

```bash
$ blocklet dev --open
```

开发 Blocklet 组件

```bash
$ blocklet dev --app-id <blocklet-app-id> --mount-point /xxx
```

- `blocklet-app-id` 可以在 blocklet 详情页面查看
- `mount-point` 组件的挂载点

### 执行脚本

在 blocklet 运行上下文中执行脚本

```bash
$ blocklet exec <script>
```

## 元信息

这是一个信息命令，用于打印 Blocklet 的元信息。

```bash
$ blocklet meta
```

## 管理 blocklet.yml 中的组件

### 添加

将组件添加到 blocklet.yml

```bash
$ blocklet add <name> --store <store> --title <title> --mount-point <mount-point>
```

- `name`：商店中组件的 id
- `--store`：组件在哪个商店
- `--title`：可以为组件自定义不同的名称
- `--mount-point`：组件的挂载点。 如果填写'/my-prefix'，那么所有以它为前缀的请求都会被转发到配置的组件

您可以在任何商店的组件详细信息页面中看到添加组件的命令。 比如要添加 DID Comments，可以到它的 [详情页](https://store.blocklet.dev/blocklets/z8ia1WEiBZ7hxURf6LwH21Wpg99vophFwSJdu) 找到命令 `blocklet add did-comments --store=https://store.blocklet.dev`

### 删除

从 blocklet.yml 中移除组件

```bash
$ blocklet remove <name>
```

执行命令后，组件信息将从 `blocklet.yml` 中删除。

## 配置 Blocklet CLI

### 配置

管理 Blocklet CLI 的配置

```bash
$ blocklet config set [key] [value]    # Set config value
$ blocklet config get [key]            # Get config value
$ blocklet config delete [key]         # Delete config value
$ blocklet config list              # List config value
```

你可为配置项设置不同的 profile

```bash
$ blocklet config set key value # set key in default profile
$ blocklet config set key value1  --profile profile1 # set key in profile1
$ blocklet config set key value2  --profile profile2 # set key in profile2

$ blocklet config get key # get key in default prifle
$ blocklet config get key --profile profile1 # get key in default prifle1
$ blocklet config get key --profile profile2 # get key in default prifle2
```

### 连接

连接到 Blocklet 商店。 此命令将通过 `blocklet config` 设置存储配置

```bash
$ blocklet connect <store-url>
```

在指定的 profile 中设置商店

```bash
$ blocklet connect <store-url> --profile <profile>
```

## Build and Publish your blocklet

### Update Version

Bumps up the Blocklet version for next changes.

```bash
$ blocklet version  1.1.0
✔ Blocklet version bumped to 1.1.0
```

### Bundle

将 Blocklet 打包。详见 [Blocklet Bundle](/how-to/bundle)

```bash
$ blocklet bundle

ℹ Bundling in webpack mode for blocklet b1...

✔ Creating blocklet bundle in .blocklet/bundle... Done in 0.013s
✔ Blocklet b1@1.0.0 was successfully bundled!
```

### Deploy

**将 Blocklet 从本目录部署到远程 Blocklet Server**

```bash
$ blocklet deploy <blocklet-bundle-folder> --endpoint xxxxxx --access-key xxxxxx --access-secret xxxxxx
```

- blocklet-bundle-folder: 使用 [blocklet bundle](/how-to/bundle) 构建后的目录，如果当前你在项目根目录，则是 `./blocklet/bundle`.
- `--endpoint`: server 的地址，以 /admin 结尾。比如，你本地的 Blocklet Server 的地址是 `http://127.0.0.1/admin`
- `--access-key`: 在 Blocklet Server 创建的 Access Key
- `--access-secret`: 在 Blocklet Server 创建的 Access Secret

**将 Blocklet 从本目录部署到本地 Blocklet Server**

```bash
$ blocklet deploy <blocklet-bundle-folder>
```

**将组件从本地目录部署到 Blocklet Server**

```bash
$ blocklet deploy <blocklet-bundle-folder> --endpoint xxxxxx --access-key xxxxxx --access-secret xxxxxx --app-id <blocklet-app-id> --mount-point /xxx`
```

- `--app-id`: 应用的 AppID, 可在 blocklet 详情页中查看
- `--mount-point`: 组件的挂载点

**部署组件时将组件添加到导航中**

通过 `blocklet deploy` 部署组件时，组件不会被自动添加到导航中。你可以添加 `--navigation` 参数将组件添加到导航中。

```bash
$ blocklet deploy <blocklet-bundle-folder> --app-id xxx --navigation
```

### 上传到商店

上传 Blocklet 到商店，详见 [Publish Blocklet](../publish)

```bash
$ blocklet upload [options] [metafile]
```

## 帮助

help 命令用于获取指定命令的帮助信息。 您也可以将 `-h` 选项传递给子命令以获得帮助信息。

```bash
$ blocklet help meta
Usage: blocklet meta [options]

Print blocklet meta from a directory

Options:
  -h, --help  display help for command
```
