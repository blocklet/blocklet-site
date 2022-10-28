---
title: 部署应用到节点
description: 部署应用到节点
layout: documentation
---

在进行部署操作前，你需要确保你拥有可用于部署的 release bundle 文件。通常来说 release bundle 文件可以通过从项目的源码中打包获得，打包步骤可以参考这里：[Bundle](/how-to/bundle)，也可以是其他人将已经打包好的 release bundle 分享给你。

在拥有了 release bundle 文件后，你可以将 blocklet 直接部署到你的 Blocklet Server 中

## 将 Blocklet 部署到 Blocklet Server

### STEP 1

在你的 Blocklet Server 创建 Access Key

![](./access-key.png)

### STEP 2

执行 `blocklet deploy` 命令，将 blocklet 部署到 Blocklet Server

```bash
blocklet deploy <blocklet-bundle-folder> --endpoint xxxxxx --access-key xxxxxx --access-secret xxxxxx
```

- blocklet-bundle-folder: 使用 [blocklet bundle](/how-to/bundle) 构建后的目录，如果当前你在项目根目录，则是 `.blocklet/bundle`.
- `--endpoint`: server 的地址，以 /admin 结尾。比如，你本地的 Blocklet Server 的地址是 `http://127.0.0.1/admin`
- `--access-key`: 第一步创建的 Access Key
- `--access-secret`: 第一步创建的 Access Secret

## 将 Blocklet 部署到本机的 Blocklet Server

如果你想将 Blocklet 部署到本机的 Blocklet Server, 则可以直接执行 `blocklet deploy <blocklet-bundle-folder>`

## 将 Component 部署到 Blocklet Server

部署 Component 到 Blocklet Server 与部署 Blocklet 的命令相同，你需要添加额外的参数

```
blocklet deploy <blocklet-bundle-folder> --endpoint xxxxxx --access-key xxxxxx --access-secret xxxxxx --app-id <blocklet-app-id> --mount-point /xxx`
```

- `--app-id`: 应用的 AppID, 可在 blocklet 详情页中查看
- `--mount-point`: 组件的挂载点
