---
title: 启动 Blocklet Server
description: 启动 Blocklet Server
layout: documentation
---

Blocklet Server 目前除了可以运行在 \*nix 系统中，详见 [启动 Blocklet Server](https://developer.blocklet.io/docs/zh/prerequisites/server). 同时我们还提供了 Docker 镜像、AMI 等资源，可以分别在 Docker, AWS 上使用这些镜像启动 Blocklet Server.

除此之外，我们还提供了 ArcBlock Launcher 服务，使用 ABT 或信用卡购买节点。

## 使用 Docker 启动节点

1. 拉取镜像

```bash
$ docker pull arcblock/blocklet-server:latest
```

2. 启动容器

```bash
$ docker run --name test-server -d -p 80:80 -p 443:443 -v /tmp/test:/data arcblock/blocklet-server
```

参数解释:

- `--name` 指定容器的名称
- `-d` 让容器在后台运行
- `-p` 指定容器暴露的端口，Blocklet Server 会运行在 80 和 443 端口，所以需要容器暴露这来这两个端口
- `-v` 挂载磁盘目录，Blocklet Server 中的数据会存储在 `/data` 目录中，为了方式数据丢失，所以需要将 Docker 中的数据目录挂载到主机的一个目录中

如果一切正常，Blocklet Server 服务大概一分钟内可以启动成功，可以使用 `docker logs {容器名称}` 命令查看容器内的启动信息:

```bash
$ docker logs test-server

                 Powered By
     _             ____  _            _
    / \   _ __ ___| __ )| | ___   ___| | __
   / _ \ | '__/ __|  _ \| |/ _ \ / __| |/ /
  / ___ \| | | (__| |_) | | (_) | (__|   <
 /_/   \_\_|  \___|____/|_|\___/ \___|_|\_\

            Blocklet CLI v1.8.22

blocklet server v1.8.22
Blocklet Server instance already exists in /data/abtnode, now starting...
✔ Blocklet Server DB Proxy ready on port 40404
ℹ Node DID from config zNKZ5v8AqMfNrZoTrdComvjZdGKkjrDqALPx
ℹ Node config from /data/abtnode/.blocklet-server/config.yml
✔ Blocklet Server Event Hub ready on port 40407
✔ Blocklet Server Updater ready on port 40405
✔ Fetch wildcard certificates successfully
- Starting Blocklet Service...
✔ Starting Blocklet Service... Done in 21.351s
- Starting Blocklet Server Daemon...
✔ Starting Blocklet Server Daemon... Done in 29.49s
```

3. 通过 IP Echo 地址访问节点

节点启动成功后可以通过 IP Echo 地址访问改节点。比如，如果本机 IP 是`192.168.0.10`, 那么 IP Echo 地址就是 `https://192-168-0-10.ip.abtnet.io/`.

## 在 AWS 中启动节点

我们提供了一个 Blocklet Server AMI 镜像，在创建 EC2 时可以基于我们的 AMI 镜像快速启用一个节点。

> This doc is a draft and needs to be updated

## 通过 ArcBlock Launcher 启动节点

ArcBlock Launcher 是一个可以通过 ABT, 信用卡购买 Blocklet Server 节点的服务。通过该服务可以省去 Node.js/Blocklet CLI/Nginx 等环境或依赖的安装，只需要填写配置信息就可以得到一个运行的节点。

地址: http://launcher.arcblock.io/
