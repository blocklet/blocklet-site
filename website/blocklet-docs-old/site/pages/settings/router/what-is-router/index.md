---
title: 'What is Service Gateway?'
description: 'Routing, URL Mapping, SSL and Load Balancing for Blocklet Server?'
keywords: 'blocklet server, blocklet'
author: 'wangshijun'
category: ''
layout: 'documentation'
tags:
  - 'blocklet server'
---

## What is Blocklet Server's Service Gateway?

The Blocklet Server **Service Gateway** allows you to manage the communication services running for your Blocklet Server including

## URL Mapping

Blocklet Server allows you to map your URLs for your Blocklet Server system and Blocklets redirects (permanent and temporary).

![](./images/url-mapping.png)

#### URLs

You can add new site and rules for specific IP addresses or domains that you own. Once a new site is added, you can create rules to assign a blocklet or service to your domain, or create custom temporary or permanent redirects.

![](./images/urls.png)

#### System URLs

Each time you install a Blocklet from the Store, Blocklet Server will automatically generate a new subdirectory that includes a system URL to ensure the node and the blocklet can communicate. System URLs also give you useful information about each blocklet including any available interfaces, the subdirectory, the current status of the blocklet and a link manage the blocklet.

![](./images/system-url.png)

## SSL Certificates

Add SSL Certificate files to your Blocklet Server using your SSL Certificate File and Private Key Files to secure services on your node. Today, Blocklet Server supports single domain SSLs and Wilcard SSLs to protect a domain (arcblock.io) and all its related subdomains (test.arcblock.io, shop.arcblock.io, etc). Blocklet Server does not support partial or multi-wild card SSLs. Please confirm with your SSL provider on the best SSL type for your project. Developers can also leverage Letsencrypt self-signed [Certificates for localhost](./certificates-for-localhost).

![](./images/ssl-certificate.png)

## Load Balancing

Blocklet Server includes NGINX by default to give you a high performance routing layer that includes support for path prefixes and domains. _Blocklet Server will support additional application load balancers and elastic load balancers soon._

![](./images/nginx.png)

## Pub/Sub Gateway (coming soon)

Blocklet Servers highly scalable pub/sub gateway for asynchronous messsaging.
