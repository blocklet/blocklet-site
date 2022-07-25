---
title: '下载资源'
description: '下载相关资源'
keywords: '下载,资源'
author: 'zhenqiang'
category: ''
layout: 'documentation'
tags:
  - '下载'
  - '资源'
---

Blocklet Server 在启动的时候会下载一些资源，比如 HTTPS 证书。Blocklet Server CLI 默认在初始化时默认设置了这些下载地址，但是在有些情况下默认地址可能不能正常访问。在该文档中会给出一些其它可选的下载地址。

## HTTPS 证书下载地址

- 默认下载地址: https://releases.arcblock.io/
- 国内阿里云地址: https://releases.arcblockio.cn/

可以通过`ABT_NODE_WILDCARD_CERT_HOST`环境变量设置下载地址，比如:

```bash
ABT_NODE_WILDCARD_CERT_HOST=https://releases.arcblockio.cn blocklet server start
```
