---
title: 发布应用
description: 发布应用
layout: documentation
---

## 发布应用到 Blocklet Store

1. 从 Blocklet Store 注册成为一名开发者
   - Blocklet Store 是去中心化的
   - Arcblock 提供了两个官方的 Blocklet Store: [blocklet store](https://store.blocklet.dev/) and [blocklet store(dev)](https://dev.store.blocklet.dev/)
   - 你可以参考这里 [Host Blocklet Store](https://store.blocklet.io/docs/en/host/launch-store) 部署一个自己的 Blocklet Store
   - 你需要先申请开发者，在管理员批准后，你可以进行下一步的工作
2. 创建一个新的访问密钥
   - 使用 `blocklet connect <store-url>` 命令从 Blocklet Store 创建一个访问密钥
3. 打包应用
   - 参考 [Bundle your blocklet](/how-to/bundle)
4. 上传应用
   - 使用 `blocklet upload` 命令去上传一个应用到 Blocklet Store
5. 登录到上传的 Blocklet Store，你可以在管理仪表板的 "我的应用 "页面中看到上传的应用
6. 上传的应用仍处于"草稿"状态，点击"发布"按钮即可发布。

## 发布应用到多个 Blocklet Store

- 使用 `blocklet connect <store-url> --profile <profile>` 命令保存不同 Blocklet Store 的访问密钥
- 使用 `blocklet upload --profile <profile>` 命令上传应用到不同的 Blocklet Store

<!-- ## Host with github release -->

<!-- ## Other hosting options? -->
