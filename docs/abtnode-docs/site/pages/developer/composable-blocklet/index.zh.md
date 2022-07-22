---
title: '可组合的 Blocklet'
description: '向搭建乐高积木一样搭建 Blocklet'
keywords: 'blocklet server, blocklet, compoment'
author: 'linchen'
category: ''
layout: 'documentation'
tags:
  - 'blocklet server'
  - 'blocklet'
  - 'compoment'
---

将不同的 blocklet 组合在一起，形成更加强大的 blocklet

## Demo

Demo:

[https://github.com/blocklet/component-demo](https://github.com/blocklet/component-demo)

blocklet.yml:

[https://github.com/blocklet/component-demo/blob/main/blocklet.yml](https://github.com/blocklet/component-demo/blob/main/blocklet.yml)

```yml
name: parent-blocklet
interfaces:
  - name: publicUrl
children:
  - name: child-blocklet
    resolved: 'xxx'
    mountPoints:
      - root:
          interfaceName: publicUrl
          prefix: '/path/to/xxx'
      - child:
          interfaceName: publicUrl
```

## 配置 Services

Parent blocklet 和 Child blocklet 的 service 配置是独立的，不是统一的。

> services 的具体配置方式见 [https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md](https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md)

### Parent blocklet services
- Parent blocklet services 在 parent blocklet.yml 中 `interface.services` 配置

### Child blocklet services
- Child blocklet services 在 child blocklet.yml 中 `interface.services` 配置
- 当 parent blocklet.yml 中配置了 `children.mountPoints.services` 时，会和 child blocklet.yml `interface.services` 合并

合并策略举例:

parent blocklet.yml:

```yml
name: parent-blocklet
interfaces:
  - name: parentInterfaceName
children:
  - name: child-blocklet
    resolved: 'xxxx'
    mountPoints:
      - root:
          interfaceName: parentInterfaceName
          prefix: '/path/to/xxx'
      - child:
          interfaceName: childInterfaceName
      - services:
          - name: s1
          - name: s2
```

child blocklet.yml:

```yml
name: child-blocklet
interfaces:
  - name: childInterfaceName
    services:
      - name: s2
      - name: s3
```

则 child blocklet 的 services 为:
- s1 (from parent `children.mountPoints.services`)
- s2 (from parent `children.mountPoints.services`)
- s3 (from child `interface.services`)