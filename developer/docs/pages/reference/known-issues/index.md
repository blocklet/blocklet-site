---
title: Known Issues or Limitations
description: Known Issues or Limitations
layout: documentation
---

## Service worker

你可以在 `blocklet.yml` 中声明 blocklet 以 Cluster 模式运行，提升性能。

```yml
capabilities:
  clusterMode: true
```

blocklet 安装后，使用者可以在 blocklet 管理页面中设置以 Cluster 模式启动时的实例数量。

注意：实例数量不要大于 CPU 核数。

注意：以 Cluster 模式启动时，blocklet 本身应该是无状态的。

## Memory and CPU

TBD

## Develop react blocklet as a component

TBD
