---
title: Blocklet CLI
description: Blocklet CLI
layout: documentation
---

Blocklet Server CLI provides `blocklet server` command-line tool for controlling and administering Blocklet Server in local machine. Use the following syntax to run `blocklet server` commands from your terminal:

```bash
blocklet server [options] [command]
```

You can use the `-h` or `--help` to determine the full list of supported commands.

## Init

Init a Blocklet Server

```bash
$ blocklet -V
1.4.4
```

## Start

Start a Blocklet Server

```bash
$ cd <your blocklet server folder>
$ blocklet server start
```

## Stop

Stop Blocklet Server and blocklets

```bash
$ cd <your blocklet server folder>
$ blocklet server stop
```

## Status

Show Blocklet Server and blocklet status

```bash
$ cd <your blocklet server folder>
$ blocklet server status
```

## Logs

Show Blocklet Server and blocklet log files

```bash
$ cd <your blocklet server folder>
$ blocklet server logs
```

## Info

Get environment information for debugging and issue reporting

```bash
$ cd <your blocklet server folder>
$ blocklet server info
```

Copy info to clipboard

```bash
$ cd <your blocklet server folder>
$ blocklet server info --clipboard
```

## Upgrade

Self-Upgrade Blocklet Server

```bash
$ blocklet server upgrade
```
