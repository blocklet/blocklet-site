---
title: 'Setup blocklet dev environment'
description: 'Instructions on how setup blocklet development environment'
keywords: 'development'
author: 'polunzh'
category: ''
layout: 'documentation'
tags:
  - 'blocklet server'
  - 'development'
---

## Install Node.js

The [Node.js Official Website](https:/nodejs.orgendownload) describes various ways to install Node.js, but we recommend using [nvm](https:/github.comnvm-shnvm) to install Node.js, as this is a very convenient way to switch between different versions of Node.js.

### Install nvm

The installation of nvm is easy, just execute a shell script, the latest version of nvm is v0.37.2:

```bash
$ curl -o- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh> | bash
# or via wget
$ wget -qO- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh> | bash
```

Of course, the safest way is to copy the latest official shell script: https://github.com/nvm-sh/nvm#install--update-script

After installing nvm, either reboot the terminal or execute the following script for the nvm command to take effect:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \\. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

### Install Node.js of LTS version

After installing nvm, we can install Node.js, we recommend installing the latest LTS version:

```bash
$ nvm install --lts
```

Use the `node -v` command to view the installed version of Node.js.

## Install Blocklet Server

After completing the installation of Node.js, you can install Blocklet Server:

```bash
$ npm install -g @blocklet/cli
```

> You can also install `@blocklet/cli` globally with yarn or pnpm.

After installation, you can run `blocklet --version` to see the current version.

## Install VSCode

Although there are many editors/IDEs, we recommend [VS Code](https://code.visualstudio.com/), VS Code is probably the best editor in the JavaScript ecosystem to use for developing JavaScript/Node.js applications. It is ready to use right out of the box.

Installation is also very easy, as the website provides installation packages for Windows/Mac/common Linux distributions that can be installed with a single click: https://code.visualstudio.com/#alt-downloads
