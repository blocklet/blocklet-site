---
title: '配置开发环境'
description: '配置开发环境'
keywords: 'blocklet server, development'
author: 'polunzh'
category: ''
layout: 'documentation'
tags:
  - 'blocklet server'
  - 'development'
---

## Install Node.js

[Node.js 官网](https://nodejs.org/en/download/)介绍了多种安装 Node.js 的方法，不过我们这里推荐使用 [nvm](https://github.com/nvm-sh/nvm) 安装 Node.js, 因为这样的话可以很方便的在不同的 Node.js 版本之间切换。

### Install nvm

nvm 的安装比较容易，直接执行一条 shell 脚本就可以了, nvm 当前最新版本是 v0.37.2:

```bash
$ curl -o- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh> | bash
# 或者使用 wget
$ wget -qO- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh> | bash
```

当然，最稳妥的方式是复制官方最新的 shell 脚本: https://github.com/nvm-sh/nvm#install--update-script

安装 nvm 后, 需要重启终端，或者执行下面的脚本使 nvm 命令生效:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \\. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

### 安装 LTS 版本 Node.js

安装完成 nvm 后我们就可以安装 Node.js 了, 我们推荐安装最新的 LTS 版本:

```bash
$ nvm install --lts
```

使用 `node -v` 命令查看已安装的 Node.js 版本。

## Install Blocklet Server

完成安装 Node.js 后就可以安装 Blocklet Server 了:

```bash
$ npm install -g @blocklet/cli
```

安装完成之后可以执行 `blocklet --version` 查看当前的版本。

## Install VSCode

虽然有很多编辑器/IDE, 但是我们推荐使用 [VS Code](https://code.visualstudio.com/), VS Code 应该是 JavaScript 生态中最好用的编辑器了，如果是开发 JavaScript/Node.js 应用，开箱即用。

安装也非常简单，官网提供了 Windows/Mac/常用的 Linux 发行版下的安装包，一键点击即可安装: https://code.visualstudio.com/#alt-downloads
