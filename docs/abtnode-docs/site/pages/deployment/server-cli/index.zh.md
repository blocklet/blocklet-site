---
title: 'Blocklet Server CLI 工具'
description: 'Blocklet Server CLI 工具'
keywords: 'blocklet server'
author: 'nate'
category: ''
layout: 'documentation'
tags:
  - 'blocklet server'
---

Blocklet Server 提供了 `blocklet server` 命令行工具，用于控制和管理节点。使用以下语法可以从您的终端运行 `blocklet server` 命令：

```bash
blocklet server [options] [command]
```

你可以使用 `-h` 或 `--help` 来查看所有支持的命令。

### 版本

查看当前 Blocklet CLI 版本。

```bash
$ blocklet -V
1.4.1
```

### 初始化

启动 Blocklet Server 的配置。配置包含节点层级的基本属性，如端口。

```bash
$ blocklet server init
? Are you sure to initialize a Blocklet Server instance in the current directory(/home/arcblock) Yes
✔ Blocklet Server configuration is successfully generated /home/arcblock/.abtnode/abtnode.yml
ℹ blocklet server start
```

### 启动

启动 Blocklet Server 守护进程。

```bash
➜ blocklet server start
ℹ Node did from config zNKhyzGJfngmBvwQiwHtBinUNiwL2SE85yAE
ℹ Load config from /data/abtnode/.abtnode/abtnode.yml
✔ Blocklet Server DB Proxy ready on port 40404
✔ Blocklet Server Event Hub ready on port 40407
✔ Blocklet Server Updater ready on port 40405
✔ Blocklet Server config updated with version 1.4.1
✔ Blocklet Server state updated with version 1.4.1
✔ Update blocklet environments success
✔ Starting Blocklet Server Service... Done in 9.195s
✔ Starting Blocklet Server Daemon... Done in 9.067s
```

Blocklet Server 必须在启动前初始化，否则启动将失败。可以通过 `--auto-init / -a` 参数来自动初始化。

### 停止

停止 Blocklet Server。该命令支持 `-f` 选项来强制停止节点。

```bash
$ blocklet server stop
ℹ Node did from config zNKp3NUU4BJG7Q2aQc93oN2CVHCdK2dNU5t5
ℹ Load config from /data/abtnode/.abtnode/abtnode.yml
✔ Sending shutdown notification to web dashboard users Done in 2.07s
✔ Routing engine is stopped successfully
✔ abt-node-daemon is stopped successfully
✔ abt-node-service is stopped successfully
✔ abt-node-updater is stopped successfully
✔ abt-node-db-hub is stopped successfully
✔ abt-node-log-rotate is stopped successfully
✔ abt-node-event-hub is stopped successfully
✔ Done!
```

### 状态

查看 Blocklet Server 状态。

```bash
$ blocklet server status
ℹ Node did from config zNKp3NUU4BJG7Q2aQc93oN2CVHCdK2dNU5t5
ℹ Load config from /data/abtnode/.abtnode/abtnode.yml

Blocklet Server status: Running
Blocklet Server Data Directory: /data/abtnode/.abtnode

Blocklets Status
┌──────────────────────────────┬──────────┬───────────────┐
│ Name                         │ Version  │ Status        │
├──────────────────────────────┼──────────┼───────────────┤
│ static-demo-blocklet         │ 1.1.10   │ installed     │
└──────────────────────────────┴──────────┴───────────────┘
```

### 日志

查看 Blocklet Server 和 Blocklet 的日志位置。你可以从显示的位置中查看日志文件。

```bash
$ blocklet server logs
ℹ Node did from config zNKp3NUU4BJG7Q2aQc93oN2CVHCdK2dNU5t5
ℹ Load config from /data/abtnode/.abtnode/abtnode.yml

Blocklet Server Logs
- Latest logs: /data/abtnode/.abtnode/logs/_abtnode/daemon-2021-08-03.log
- Daemon Logs Directory: /data/abtnode/.abtnode/logs/_abtnode

  Daemon Logs
  - access-<date>.log: access logs rotated by day
  - daemon-<date>.log: business logs rotated by day
  - daemon-error-<date>.log: error logs rotated by day
  - service.log: blocklet server service logs
  - stderr.log: stderr logs
  - stdout.log: stdout logs

static-demo-blocklet@1.1.10
- Output: /data/abtnode/.abtnode/logs/static-demo-blocklet/output.log
- Error: /data/abtnode/.abtnode/logs/static-demo-blocklet/error.log
```

### 升级

升级 Blocklet Server 到最新版本。它执行所有必要的步骤，如停止当前版本，安装新版本，并启动它。

```bash
$ blocklet server upgrade
ℹ Using blocklet server from /home/arcblock/.local/bin/abtnode
ℹ Checking permissions...
Current version is 1.4.1, found latest version 1.4.4
Begin upgrade
ℹ Stopping Blocklet Server ...
ℹ Installing Blocklet Server ...

# Truncated for Brevity
```

### 环境变量

打印环境信息以便调试和报告问题

```bash
$ blocklet server info

  System:
    OS: Linux 5.10 Ubuntu 18.04.5 LTS (Bionic Beaver)
    CPU: (6) x64 Intel(R) Core(TM) i7-8850H CPU @ 2.60GHz
    Shell: 4.4.20 - /bin/bash
  Binaries:
    Node: 12.20.0 - /usr/bin/node
    npm: 6.14.8 - /usr/bin/npm
  Servers:
    Nginx: 1.18.0 - /usr/sbin/nginx
```

### 导出

导出 Blocklet Server 的完整状态，包括 Blocklet Server 配置、Blocklets 配置和路由，以便可以分享。

```bash
$ blocklet server export
ℹ Node did from config zNKhyzGJfngmBvwQiwHtBinUNiwL2SE85yAE
ℹ Load config from /data/abtnode/.abtnode/abtnode.yml
⚠ Will only export the blocklets that installed from blocklet store or url.
✔ Copy Blocklet Server configurations file successfully!
ℹ Copying blocklet data...
✔ Copy blocklet data successfully!
ℹ Copying other files...
ℹ Copying routing rule files...
ℹ No routing rule data
ℹ Copying blocklet running data files...
✔ Copy blocklet running data files successfully!
ℹ Copying blocklet extras db data files...
✔ Copy blocklet extras db data files successfully!
✔ Copy other files successfully!

✔ The exported data is in directory: /data/abtnode/exported_abtnode/.abtnode
✔ Exported successfully!
```

### 帮助

`help` 命令可以帮助你查看某个命令的帮助信息。同时，你也可以通过 `-h` 参数传递给子命令来获取相同的信息。

```bash
$ blocklet server help logs
Usage: blocklet server logs [options]

Show Blocklet Server and blocklet logs

Options:
  -h, --help  display help for command
```
