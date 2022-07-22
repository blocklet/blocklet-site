---
title: 'Mirrors or Alternative Services'
description: 'Use mirrors or alternative services if the defaults does not work'
keywords: 'download, resource'
author: 'zhenqiang'
category: ''
layout: 'documentation'
tags:
  - 'download'
  - 'resource'
---

> <p style={{color:"red"}}>This page is incomplete and must be updated</p>

Blocklet Server downloads some resources, such as HTTPS certificates, when it starts up, and the Blocklet Server CLI sets these download addresses by default during initialization, but in some cases the default addresses may not be accessible. Some other optional download addresses are given in this document.

## HTTPS Certificate download mirrors

- Default Address: https://releases.arcblock.io/
- Ali Cloud Address: https://releases.arcblockio.cn/

The download address can be set via the `ABT_NODE_WILDCARD_CERT_HOST` environment variable, e.g. :

```bash
ABT_NODE_WILDCARD_CERT_HOST=https://releases.arcblockio.cn blocklet server start
```

## DID Registry Alternative

## Blocklet Store Alternative
