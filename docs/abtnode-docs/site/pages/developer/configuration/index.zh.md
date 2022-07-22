---
title: '节点配置'
description: '节点配置'
keywords: 'blocklet server, blocklet'
author: 'wangshijun'
category: ''
layout: 'documentation'
tags:
  - 'blocklet server'
---

Blocklet Server 配置文件 `.abtnode.yml` 里面的内容如下：

```yaml
node:
  # Blocklet Server 描述信息
  name: 'Blocklet Server'
  description: 'Container of official ArcBlock blocklets'

  # Blocklet Server  sk, pk, did 属性
  sk: '0x39231d873687551460595848ee9fe32292f9ea44213a995fa5e5e15329e81e0748c6ee9a36c0db6dabd29f64e4e916b030c7060f937008eed0793f2e20845238'
  pk: '0x48c6ee9a36c0db6dabd29f64e4e916b030c7060f937008eed0793f2e20845238'
  did: 'zNKqM4yhZg39gd5KUuVNiDzq6HrwPSK6YFeA'

  # 在哪里存储 Blocklet Server 数据: 改变这个到你的主文件夹，在 mac 通常:/Users/YOUR_NAME/.abtnode
  dataDir: /home/work/.abtnode

  # Blocklet Server 控制台访问地址
  domain: 192.168.1.2
  # Blocklet Server 控制台访问端口
  port: 8089
  https: false
  # Blocklet Server 控制台 session 秘钥
  secret: 'weilru4j2oi34u*(#U$IORQWRjk'

  # Blocklet Server 拥有者信息
  owner:
    pk: ''
    did: ''

blocklet:
  # 指定 Blocklet 监听的端口
  port: 8090
  # 指定从哪获取可用的 Blocklets
  registry: https://blocklet.arcblockio.cn
  owner:
    pk: ''
    did: ''
```

对于节点密钥和 did 部分，如果你只是测试，使用上面的值配置应该没问题，如果你想定义自己的，你可以生成如下:

```shell
npm install -g @arcblock/forge-cli
forge wallet:create
# 依次选择 `ROLE_APPLICATION`, `SHA3`, `ED25519`
# 复制 `sk`, `pk`, `address` 到 abtnode.yml 中，对应 sk, pk, did
```
