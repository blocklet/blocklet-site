---
title: 'Blocklet CLI 工具'
description: 'Blocklet CLI 工具'
keywords: 'blocklet'
author: ''
category: ''
layout: 'documentation'
tags:
  - 'blocklet'
---

Blocklet Server 提供了 `blocklet` 命令行工具，用于控制和管理 Blocklets。使用以下语法在您的终端中运行 `blocklet` 命令：

```bash
blocklet [options] [command]
```

你可以使用 `-h` 或 `--help` 来查看所有支持的命令。

### 版本

查看当前 `blocklet` 版本。

```bash
$ blocklet -V
1.4.4
```

### 初始化

启动一个空的 Blocklet。命令会询问用户 Blocklet 的参数，并生成一个 YAML 配置。

```bash
$ blocklet init
This utility will walk you through create such files and folders(if not exists):
- blocklet.yml
- blocklet.md
- screenshots/

It only covers common items, if you want to check all items, please visit:
https://github.com/ArcBlock/blocklets#keyinfo-blockletjson

Press ^C to quit.
? blocklet name, case INSENSITIVE: first
? Please write concise description: Blocklet Server blocklet project
? What's the group of the blocklet? static
? What's the entry point of the blocklet? .
? What's the public interface of the blocklet? /
? What's the admin interface of the blocklet?
? What's the config interface of the blocklet?
? What's the documentation interface of the blocklet?
? Is this OK: Yes
✔ Meta file /home/arcblock/b1/blocklet.yml was created
✔ Doc file blocklet.md was created
✔ Screenshots dir screenshots/ was created
```

或者你可以使用 `-y` 选项来通过默认的值来生成一个 Blocklet。

### 元信息

这是一个信息查看命令，它会打印一个 Blocklet 的元信息。

```bash
$ blocklet meta
```

### 开发

通常来说你会希望在开发过程中部署 Blocklets，这个命令提供了 _安装_、_启动_ 和 _卸载_ 的支持。

```bash
$ blocklet dev install
ℹ Try to dev blocklet from /home/arcblock/b1
ℹ Node did from config zNKhyzGJfngmBvwQiwHtBinUNiwL2SE85yAE
ℹ Load config from /data/abtnode/.abtnode/abtnode.yml
✔ Blocklet first@1.1.0 was successfully installed
```

```bash
$ blocklet dev start
ℹ Try to dev blocklet from /home/arcblock/b1
ℹ Node did from config zNKhyzGJfngmBvwQiwHtBinUNiwL2SE85yAE
ℹ Load config from /data/abtnode/.abtnode/abtnode.yml


2021-08-05T13:47:43: Static blocklet ready on port 8091 from /home/arcblock/b1
✔ Blocklet first@1.1.0 was successfully started

ℹ You can access with the following URL

- http://127.0.0.1

ℹ Note that your blocklet is running in development in Blocklet Server,
ℹ To run it in production mode, you can use blocklet bundle and then blocklet deploy.
```

```bash
$ blocklet dev remove
ℹ Try to dev blocklet from /home/arcblock/b1
ℹ Node did from config zNKhyzGJfngmBvwQiwHtBinUNiwL2SE85yAE
ℹ Load config from /data/abtnode/.abtnode/a
```

### 打包

打包 Blocklet 以便在 Blocklet Server 中部署。

```bash
$ blocklet bundle

ℹ Bundling in webpack mode for blocklet b1...

✔ Creating blocklet bundle in .blocklet/bundle... Done in 0.013s
✔ Blocklet b1@1.0.0 was successfully bundled!
```

### 部署

从本地目录中部署一个 Blocklet。

```bash
$ blocklet deploy .
ℹ Node did from config zNKhyzGJfngmBvwQiwHtBinUNiwL2SE85yAE
ℹ Load config from /data/abtnode/.abtnode/abtnode.yml
ℹ Try to deploy blocklet from /home/arcblock/b1 to http://127.0.0.1:8089
ℹ Name: first
ℹ DID: z8iZqE2Ce7Tec6JrzJU4Wv1QbzbLnmJwJAeEQ
ℹ Version: 1.0.0
ℹ Added Files: 4
  -  blocklet.yml
  -  blocklet.md
  -  .blocklet/bundle/blocklet.yml
  -  .blocklet/bundle/blocklet.md
✔ Uploading first... Done in 0.44s
✔ Blocklet first@1.0.0 was successfully deployed to http://127.0.0.1:8089
```

### 更新版本

```bash
$ blocklet version  1.1.0
✔ Blocklet version bumped to 1.1.0
```

### 发布

发布 blocklet 到 Blocklet Store，详情操作请查看 [发布 Blocklet](../publish-blocklets)

```bash
blocklet upload [options] [metafile]
```

### Blocklet 元信息迁移

`blocklet migrate` 命令会更新 Blocklet 的元信息，以便在最新的 Blocklet Server 版本中使用。

```bash
$ blocklet migrate
ℹ Try migrating blocklet meta from /home/arcblock/b1
```

### Blocklet 配置

管理 Blocklet Server 的配置文件

```bash
blocklet config [options] [key] [value]
```

### 帮助

`help` 命令是用来获取某个命令的信息的，你同样可以通过 `-h` 选项来获取子命令的信息。

```bash
$ blocklet help meta
Usage: blocklet meta [options]

Print blocklet meta from a directory

Options:
  -h, --help  display help for command
```
