---
title: Known Issues or Limitations
description: Known Issues or Limitations
layout: documentation
---

:::Alert
this page is in draft mode and need to be updated
:::

## Cluster Mode

你可以在 `blocklet.yml` 中声明 blocklet 以 Cluster 模式运行，提升性能。

```yml
capabilities:
  clusterMode: true
```

blocklet 安装后，使用者可以在 blocklet 管理页面中设置以 Cluster 模式启动时的实例数量。

注意：实例数量不要大于 CPU 核数。

注意：以 Cluster 模式启动时，blocklet 本身应该是无状态的。

## Memory and CPU

- 最大可以运行的 blocklet 数量？
- 最低的硬件要求？

## Develop react blocklet as a component

我们推荐使用 vite 而不是 react-scripts 来作为基础的构建工具，因为后者不容易扩展。介绍下 vite 插件的使用

