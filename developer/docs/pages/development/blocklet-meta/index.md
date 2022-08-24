---
title: Blocklet Meta
description: Blocklet Meta
layout: documentation
---

## What is Blocklet Meta

Blocklet Meta describes the basic information of Blocklet and some configuration information.

Blocklet Meta is described in `blocklet.yml`.

This page introduces the necessary configuration for Blocklet to run. For the complete configuration document, see [Blocklet Meta](/apis/blocklet-spec)

## DID

```yml
name: example
did: z8iZrkWYbi3JU3AP9NHJQbBUdrgiRbeorauqf
```

Bloklet DID represents the Bundle ID after the Blocklet is packaged, specified by `name` and `did`.

`name` is a human readable ID, `did` is derived from `name`. Unique `name` derives unique `did`.

**In general, `did` should not be modified manually, `name` and `did` should be automatically generated when the project is initialized via `create-blocklet`.**

When going to the Blocklet Store, the same DID means the same Bloklet.

When installing a Blocklet to the Blocklet Server, the same DID represents the same Bloklet.

## Version

```yml
version: 1.0.0
```

Specify the Blocklet version via `version`.

When upgrading Blocklet, the `version` in `blocklet.yml` can be modified by the `blocklet version` command

## name and description

```yml
title: Example APP
description: Demo blocklet that shows how to configure Blocklet Meta
```

Blocklet names and descriptions are represented by `title` and `description`.

`title` and `description` will be rendered in the page and visible to the user.

For more configuration see [Blocklet Meta: Infomation](/apis/blocklet-spec#Infomation)

## access entry

```yml
interfaces:
  - type: web
    name: publicUrl
    path: /
    prefix: '*'
    port: BLOCKLET_PORT
    protocol: http
```

The access entry provided by Blocklet externally is declared in `interfaces`

**No need to manually modify `interfaces`, just use the `interfaces` automatically generated when the project is initialized with `create-blocklet`.**

Each blocklet must declare and only one Web access entry.

`interfaces` For more configuration see [Blocklet Meta: Interfaces](/apis/blocklet-spec#Interfaces)

## Blocklet types

There are two types of Blocklets

- Pure Static: Contains only static resources. At startup, a purely static Blocklet will be served by the static resource service built into the Blocklet Server
- DPP: This type of Blocklet itself contains back-end services (and can also contain static resources at the same time). When starting, the DPP type Blocklet will start the service at the port number assigned by the Blocklet Server

Specify the Blocklet type through `group`, and specify the Blocklet startup entry through `main`

Blocklets of DPP type need to specify the blocklet development environment startup entry through `scripts.dev`

Pure static type:

```yml
group: static
main: www
```

DPP type:

```yml
group: dapps
main: index.js
scripts:
  dev: npm run dev
```

For more types see [Blocklet Meta: Type](/apis/blocklet-spec#Types)
