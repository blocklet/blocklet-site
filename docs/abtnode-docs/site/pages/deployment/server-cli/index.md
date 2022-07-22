---
title: 'Blocklet Server CLI'
description: 'Blocklet Server CLI'
keywords: 'blocklet server'
author: 'nate'
category: ''
layout: 'documentation'
tags:
  - 'blocklet server'
---

> <p style={{color:"red"}}>This page is outdated and must be updated</p>

Blocklet Server provides `blocklet server` command-line tool for controlling and administering the node. Use the following syntax to run `blocklet server` commands from your terminal:

```bash
blocklet server [options] [command]
```

You can use the `-h` or `--help` to determine the full list of supported commands.

### Version

Shows the current Blocklet Server version.

```bash
$ blocklet -V
1.4.1
```

### Initialize

Bootstraps a configuration for the Blocklet Server. The configuration contains Node level basic attributes like Ports.

```bash
$ blocklet server init
? Are you sure to initialize a Blocklet Server instance in the current directory(/home/arcblock) Yes
✔ Blocklet Server configuration is successfully generated /home/arcblock/.abtnode/abtnode.yml
ℹ blocklet server start
```

### Start

Starts the Blocklet Server Daemon.

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

Blocklet Server must be initialised before starting else the startup will fail. Alternatively, you can pass the `--auto-init / -a` flag to perform auto initialization.

### Stop

Stops the Blocklet Server. The command also supports a `-f` option to force stop the daemon.

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

### Status

Show the status of Blocklet Server along with the Blocklets.

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

### Logs

Show the location of the different Blocklet Server and Blocklet logs. You can tail the individual log files from the displayed locations.

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

### Upgrade

Upgrades the Blocklet Server to the latest available version. It performs all the required steps like stopping the current version, installing the new version, and starting it.

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

### Environment Info

Prints the environment information for debugging and issue reporting

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

### Export

Exports the complete Blocklet Server state, including Blocklet Server configuration, Blocklets configuration and Routes, so that it can be shared.

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

### Help

The help command is useful to determine information for a particular command. Optionally you can also pass the `-h` option to the sub-command for the same purpose.

```bash
$ blocklet server help logs
Usage: blocklet server logs [options]

Show Blocklet Server and blocklet logs

Options:
  -h, --help  display help for command
```
