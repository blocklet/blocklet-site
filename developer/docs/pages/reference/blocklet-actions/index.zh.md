---
title: GitHub Actions
description: 对于一个现代化的应用来说，我们应该更多的将时间用于在开发项目上，而不是改将时间花在处理每一次的发布打包过程中。本文能够让你更轻松的使用 GitHub Actions 来提升你的工作效率。
layout: documentation
---

如果你使用的是 GitHub Actions 来管理 Blocklet 应用的打包、发布、部署等流程，那么你将在本文中更高效的 Blocklet 应用部署指南。

## Action workflow 是什么？

[action-workflow](https://github.com/blocklet/action-workflow) 是我们在大量的 Blocklet 应用开发实践中总结出来的快捷发布流程。

借助于 action-workflow，我们能够快速的给每个 Blocklet 应用配置 CI 中的流程，在节省了开发时间的基础上，我们同样也节省掉了 CI 中的调试时间成本。

## 如何使用 Action workflow？

首先你的项目需要先创建一个 `.github` 文件夹，来开启 [GitHub Actions](https://docs.github.com/cn/actions) 功能

然后创建一个在 `.github` 中创建 `workflows/main.yml` 文件，并配置一些必备的初始化流程。比如 `git checkout`、`dependencies install` 等。完整的例子可以参考这里：[Blocklet Site](https://github.com/blocklet/publish-kit/blob/master/.github/workflows/main.yml)

一切就绪之后，增加以下内容用来接入 Blocklet action-workflow 功能：

```yaml
- name: Deploy Blocklet Site
  uses: blocklet/action-workflow@v1
  with:
    skip-deps: false
    skip-bundle: false
    skip-upload: false
    skip-deploy: false
    skip-release: false
    skip-readme: false
    working-directory: ./
    bundle-command: npm run bundle
    store-endpoint: ${{ secrets.STORE_ENDPOINT }}
    store-access-token: ${{ secrets.STORE_ACCESS_TOKEN }}
    store-developer-did: ${{ secrets.STORE_DEVELOPER_DID }}
    server-endpoint: ${{ secrets.XMARK_NODE_ENDPOINT }}
    server-access-key: ${{ secrets.XMARK_NODE_ACCESS_KEY }}
    server-access-secret: ${{ secrets.XMARK_NODE_ACCESS_SECRET }}
    deploy-app-did: xxxxxx
    deploy-mount-point: xxxxxx
    slack-webhook: xxxxxx
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

### 功能介绍

Blocklet action-workflow 共包含：环境准备、项目打包、上传至 Blocklet Store、部署至 Blocklet Server、发布 Github Release 五大功能。

以下按照功能划分对 action-workflow 进行详细介绍

#### 基础部分
- `working-directory`：执行 Blocklet action-workflow 的目录，常用于 monorepo 中，同时存在多个 Blocklet 应用需要进行打包、上传、发布等步骤，默认为 `./`

#### 环境准备

- `skip-deps`：是否跳过 blocklet-server 环境准备步骤，默认为 `false`

#### 项目打包

- `skip-bundle`：是否跳过 bundle 步骤，默认为 `false`
- `bundle-command`：Blocklet 应用打包的命令，一般情况下都是 `npm run bundle`，如果 `skip-bundle` 不为 `true`，则该项为必填项

#### 上传至 Blocklet Store
- `skip-upload`：是否跳过上传 Blocklet 应用到 Blocklet Store 步骤，默认为 `true`
- `store-endpoint`：Blocklet Store 的网址，可自由配置需要将应用上传到哪个 Blocklet Store，如果 `skip-upload` 不为 `true`，则该项为必填项
- `store-access-token`：在 Blocklet Store 中申请的密钥，需要先注册为对应 Blocklet Store 的开发者，然后申请一个上传密钥，如果 `skip-upload` 不为 `true`，则该项为必填项。更详细的内容请参考：[Blocklet Store](https://store.blocklet.dev/docs)
- `store-developer-did`：开发者在对应 Blocklet Store 中的开发者 ID，当需要上传一个付费的 Blocklet 时，该项是必填项。更详细的内容请参考：[Blocklet Store](https://store.blocklet.dev/docs)

#### 部署至 Blocklet Server
- `skip-deploy`：是否跳过部署 Blocklet 应用到指定的 Blocklet Server 步骤，默认为 `true`
- `server-endpoint`：要部署的 Blocklet Server 地址，如果 `skip-deploy` 不为空。更详细的内容请参考：[Blocklet Deploy](/reference/blocklet-cli#deploy)
- `server-access-key`：在 Blocklet Server 创建的 Access Key，如果 `skip-deploy` 不为空。更详细的内容请参考：[Blocklet Deploy](/reference/blocklet-cli#deploy)
- `server-access-secret`：在 Blocklet Server 创建的 Access Secret `skip-deploy` 不为空。更详细的内容请参考：[Blocklet Deploy](/reference/blocklet-cli#deploy)
- `deploy-app-did`：将当前应用部署在哪一个 Blocklet 应用下（成为其子组件），如果需要将该应用作为子组件来部署，则需要填写该项。更详细的内容请参考：[Blocklet Deploy](/reference/blocklet-cli#deploy)
- `deploy-mount-point`：该应用作为子组件部署时，配置其挂载的路径，如果需要将该应用作为子组件来部署，则需要填写该项。更详细的内容请参考：[Blocklet Deploy](/reference/blocklet-cli#deploy)
- `slack-webhook`：配置一个 slack 的 webhook，用于在 Blocklet 应用成功部署后发一个 slack 通知。

#### 发布 Github Release
- `skip-release`：是否跳过发布 Github Release 步骤，默认为 `false`
- `skip-readme`：是否跳过更新 `README.md` 文件步骤，默认为 `false`
- `github-token`：配置一个具有 `write` 权限的 `token`，该 `token` 将用于在 CI 中更新项目的 `README.md` 文件



### 使用场景
以下从使用场景出发，介绍各个场景下如何组合出 action-workflow 的使用方式
#### 发布应用到 Blocklet Store
在完成应用的开发后，希望能够每次将最新的代码发布到 Blocklet Store 中，这个时候需要用上 `环境准备`、`项目打包`、`上传至 Blocklet Store` 步骤，参考如下代码：
```yaml
- name: Upload to Blocklet Store
  uses: blocklet/action-workflow@v1
  with:
    skip-deps: false
    skip-bundle: false
    skip-upload: false
    skip-deploy: true
    skip-release: true
    skip-readme: true
    bundle-command: npm run bundle
    store-endpoint: ${{ secrets.STORE_ENDPOINT }}
    store-access-token: ${{ secrets.STORE_ACCESS_TOKEN }}
    store-developer-did: ${{ secrets.STORE_DEVELOPER_DID }}
```

#### 部署应用到 Blocklet Server
在某些情况下，不希望应用发布到 Blocklet Store，而直接部署到一台指定的 Blocklet Server 中，这个时候需要用上 `环境准备`、`项目打包`、`部署至 Blocklet Server` 步骤，参考如下代码：
```yaml
- name: Deploy to Blocklet Server
  uses: blocklet/action-workflow@v1
  with:
    skip-deps: false
    skip-bundle: false
    skip-upload: true
    skip-deploy: false
    skip-release: true
    skip-readme: true
    bundle-command: npm run bundle
    server-endpoint: ${{ secrets.XMARK_NODE_ENDPOINT }}
    server-access-key: ${{ secrets.XMARK_NODE_ACCESS_KEY }}
    server-access-secret: ${{ secrets.XMARK_NODE_ACCESS_SECRET }}
    slack-webhook: xxxxxx
```

如果需要将应用部署为另一个应用的子组件，可以加上以下参数进行配置：
```yaml
deploy-app-did: xxxxxx
deploy-mount-point: xxxxxx
```

#### 发布 Github Release
在某些情况下，想要把当前应用打包进行一个存档，在将来再通过 Blocklet Server 进行安装运行，这个时候需要用上 `环境准备`、`项目打包`、`发布 Github Release` 步骤，参考如下代码：
```yaml
- name: Release to Github
  uses: blocklet/action-workflow@v1
  with:
    skip-deps: false
    skip-bundle: false
    skip-upload: true
    skip-deploy: true
    skip-release: false
    skip-readme: true
    bundle-command: npm run bundle
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

#### 其他情况
上面三种情况描述了三种常用的场景用法，有时候需要组合上面三种场景用法来满足更多情况下的使用。比如需要同时发布到 Blocklet Store 和部署到 Blocklet Server，此时通过组合上面描述的配置即可，参考如下代码：

```yaml
- name: Upload to Blocklet Store & Deploy to Blocklet Store
  uses: blocklet/action-workflow@v1
  with:
    skip-deps: false
    skip-bundle: false
    skip-upload: false
    skip-deploy: false
    skip-release: true
    skip-readme: true
    bundle-command: npm run bundle
    store-endpoint: ${{ secrets.STORE_ENDPOINT }}
    store-access-token: ${{ secrets.STORE_ACCESS_TOKEN }}
    store-developer-did: ${{ secrets.STORE_DEVELOPER_DID }}
    server-endpoint: ${{ secrets.XMARK_NODE_ENDPOINT }}
    server-access-key: ${{ secrets.XMARK_NODE_ACCESS_KEY }}
    server-access-secret: ${{ secrets.XMARK_NODE_ACCESS_SECRET }}
    slack-webhook: xxxxxx
```
