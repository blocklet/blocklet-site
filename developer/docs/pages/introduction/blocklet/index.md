---
title: Blocklet
description: Blocklet
layout: documentation
---

## What is a Blocklet?

A Blocklet is a collection of applications that can run in Blocklet Server.

- It can be a Reactjs application, created by CRA
- It can be a Vuejs application, created by vite
- It can be an express application
- ...

In short, any application can be turned into a Blocklet application and can run in the Blocklet Server.

### Composable Blocklet

In common development models, an application is usually developed as a standalone application, and when the application needs to interact with other applications, it needs to do so through a CORS-configured interface. As you can imagine, this breaks the integration of development and makes it more difficult to deploy in production environments.

If you choose to develop a Blocklet, you can develop a combination of applications in a more relaxed mode, and you can easily combine multiple applications together after development to make them look like one application.

## What is Blocklet Server?

Blocklet Server is the hosting platform of Blocklet, which provides the running environment and basic services for Blocklet.

## What is Blocklet Service?

Blocklet Service is a series of services provided by Blocklet Server for Blocklet. Blocklet Server provides Blocklet with a lot of out-of-the-box features through Blocklet Service.

- Domain: Each Blocklet can be accessed through a unique DID Domain
- Authentication Service: DID based Authentication Service
- Access Management Service: Access Management Service based on DID Passport and RBAC
- Notification Service: Blocklet can easily send messages to DID wallets through the Notification Service

## What is Blocklet Store?

Blocklet Store is the distribution platform for Blocklets. The Blocklet Store allows you to discover, buy and install Blocklets.

ArcBlock officially provides 2 Blocklet Store:

1. [https://store.blocklet.dev](https://store.blocklet.dev): Provides production-ready Blocklets
2. [https://dev.store.blocklet.dev](https://dev.store.blocklet.dev): Provide sample/demo Blocklets for learning and experience

**Blocklet store is decentralized, you can deploy your own Blocklet store on your own Blocklet Server!**

## Quick Start

See detailed documentation [here](/development/getting-started)
