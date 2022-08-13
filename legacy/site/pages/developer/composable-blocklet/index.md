---
title: 'Composable blocklet'
description: 'Build blocklets like Lego bricks'
keywords: 'blocklet server, blocklet, compoment'
author: 'linchen'
category: ''
layout: 'documentation'
tags:
  - 'blocklet server'
  - 'blocklet'
  - 'compoment'
---

Combine different blocklets to form a more powerful blocklet.

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

## Config Services

The service configuration of Parent blocklet and Child blocklet are independent, not unified.

> For the specific configuration method of services, see [https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md](https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md)

### Parent blocklet services
- Parent blocklet services are configured in `interface.services` in parent blocklet.yml

### Child blocklet services
- Child blocklet services are configured in `interface.services` in child blocklet.yml
- When `children.mountPoints.services` is configured in parent blocklet.yml, it will be merged with child blocklet.yml `interface.services`

Examples of merger strategies:

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
          prefix: '/path/to/xx'
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

Then the services of child blocklet are:
- s1 (from parent `children.mountPoints.services`)
- s2 (from parent `children.mountPoints.services`)
- s3 (from child `interface.services`)
