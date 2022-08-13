---
title: 'Node Configuration'
description: 'Node Configuration'
keywords: 'blocklet server, blocklet'
author: 'wangshijun'
category: ''
layout: 'documentation'
tags:
  - 'blocklet server'
---

Then create a configuration at `~/.abtnode.yml` with following content:

```yaml
# Node config
node:
  # Meta
  name: 'Blocklet Server'
  description: 'Container of official ArcBlock blocklets'

  # Node wallet
  sk: '0x39231d873687551460595848ee9fe32292f9ea44213a995fa5e5e15329e81e0748c6ee9a36c0db6dabd29f64e4e916b030c7060f937008eed0793f2e20845238'
  pk: '0x48c6ee9a36c0db6dabd29f64e4e916b030c7060f937008eed0793f2e20845238'
  did: 'zNKqM4yhZg39gd5KUuVNiDzq6HrwPSK6YFeA'

  # Where to store Blocklet Server data: change this to your home folder, on mac usually: /Users/YOUR_NAME/.abtnode
  dataDir: /home/work/.abtnode

  # Node dashboard
  domain: 192.168.1.2
  port: 8089 # this port is where Blocklet Server Dashboard runs on
  https: false

  # Node dashboard session secret
  secret: 'weilru4j2oi34u*(#U$IORQWRjk'

  # Owner info
  owner:
    pk: ''
    did: ''

blocklet:
  # On which port should blocklet process listen on, multiple blocklets will use different ports incremented from this config
  port: 8090

  # Where to fetch available blocklets
  registry: https://blocklet.arcblockio.cn

  # Attached blocklet owner, can set when Node is up and running
  owner:
    pk: ''
    did: ''
```

For the node secret key and did part, if you are just testing, use the value form above configuration should be fine, if you want to define your own, you can generate as following:

```shell
npm install -g @arcblock/forge-cli
forge wallet:create
# Then choose `ROLE_APPLICATION`, `SHA3`, `ED25519`
# Then copy the `sk`, `pk`, `address` to the config
```
