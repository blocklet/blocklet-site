---
title: Blocklet
description: Blocklet
layout: documentation
---

## What is a Blocklet?

A Blocklet is a collection of applications that can run in [Blocklet Server](/introduction/blocklet-server).

- It can be a Reactjs application, created by CRA
- can be a Vuejs application, created by vite
- It can also be an express application
- It can even be a PHP or Golang application

In short, any application can be turned into a Blocklet application and can run in the Blocklet Server.


## composable Blocklets
In common development models, an application is usually developed as a standalone application, and when the application needs to interact with other applications, it needs to do so through a CORS-configured interface. As you can imagine, this breaks the integration of development and makes it more difficult to deploy in production environments.

If you choose to develop a Blocklet, you can develop a combination of applications in a more relaxed mode, and you can easily combine multiple applications together after development to make them look like one application.

## Quick Start
See detailed documentation [here](/development/getting-started)
