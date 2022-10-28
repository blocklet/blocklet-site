---
title: Blocklet CLI
description: Blocklet CLI
layout: documentation
---

Blocklet CLI provides `blocklet` command-line tool for controlling and administering Blocklets. Use the following syntax to run `blocklet` commands from your terminal:

```bash
blocklet [options] [command]
```

You can use the `-h` or `--help` to determine the full list of supported commands.

## Version

Shows the current Blocklet CLI version.

```bash
$ blocklet -V
1.4.4
```

## Create Blocklet Project

Bootstraps an Blocklet project. The command use [create-blocklet](https://www.createblocklet.dev/docs) to generate a project.

```bash
$ blocklet create
```

## Development a blocklet

### Develop

Develop blocklet from current directory

```bash
blocklet dev
```

Open the browser after blocklet had been started

```bash
blocklet dev --open
```

Develop blocklet as a component

```bash
blocklet dev --app-id <blocklet-app-id> --mount-point /xxx
```

- `blocklet-app-id` can be viewed in the blocklet details page
- `mount-point` the mount point of the component

### Exec script

Execute script in blocklet running context

```bash
blocklet exec <script>
```

## Meta

This is an informational command which prints meta information for a Blocklet.

```bash
$ blocklet meta
```

## Manage components in blocklet.yml

### Add

Add component to blocklet.yml

```bash
Usage: blocklet add <name> --store <store> --title <title> --mount-point <mount-point>
```

- `name`: the id of the component in the store
- `--store`: which store the component is in
- `--title`: you can customize different names for components
- `--mount-point`: the mount point of the component. If you fill in '/my-prefix', then all requests prefixed with it will be forwarded to the configured component

You can see the command to add a component in the component details page of any store. For example, if you want to add DID Comments, you can go to its [details page](https://store.blocklet.dev/blocklets/z8ia1WEiBZ7hxURf6LwH21Wpg99vophFwSJdu) Find the command `blocklet add did-comments --store=https://store.blocklet.dev`

### Remove

Remove component from blocklet.yml

```bash
blocklet remove <name>
```

## Config Blocklet CLI

### Config

Manage the configuration for Blocklet CLI

```bash
blocklet config set [key] [value]    # Set config value
blocklet config get [key]            # Get config value
blocklet config delete [key]         # Delete config value
blocklet config list              # List config value
```

你可为配置项设置不同的 profile

```bash
blocklet config set key value # set key in default profile
blocklet config set key value1  --profile profile1 # set key in profile1
blocklet config set key value2  --profile profile2 # set key in profile2

blocklet config get key # get key in default prifle
blocklet config get key --profile profile1 # get key in default prifle1
blocklet config get key --profile profile2 # get key in default prifle2
```

### Connect

Connect to blocklet store. This command will set store configuration by `blocklet config`

```bash
blocklet connect <store-url>
```

Set store configuration to specific profile

```bash
blocklet connect <store-url> --profile <profile>
```

After executing the command, the component information will be removed from `blocklet.yml`.

## Build and Publish your blocklet

### Update Version

Bumps up the Blocklet version for next changes.

```bash
$ blocklet version  1.1.0
✔ Blocklet version bumped to 1.1.0
```

### Bundle

Packages the Blocklet.

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

- blocklet-bundle-folder: 使用 [blocklet bundle](/how-to/bundle) 构建后的目录，如果当前你在项目根目录，则是 `.blocklet/bundle`.
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

### Upload

Upload the blocklet release to store, see the detail in [publish blocklet](../publish)

```bash
blocklet upload [options] [metafile]
```

## Help

The help command is useful to determine information for a particular command. Optionally you can also pass the `-h` option to the sub-command for the same purpose.

```bash
$ blocklet help meta
Usage: blocklet meta [options]

Print blocklet meta from a directory

Options:
  -h, --help  display help for command
```
