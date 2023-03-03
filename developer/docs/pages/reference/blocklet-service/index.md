---
title: Blocklet Service
description: Blocklet Service
layout: documentation
---

Blocklet Service provides some out-of-the-box services for Blocklets.

After the blocklet is installed, it can be accessed through `{blocklet domain}/{following path}`

e.g. https://developer.blocklet.io/.well-known/service/health

## Web page

- `/.well-known/service/lost-passport` Retrieve the passport
- `/.well-known/service/login` Access the login page
- `/.well-known/service/admin` Access the management background
- `/.well-known/service/blocklet/logo` Get the app logo
- `/favicon.ico` Get the app favicon

## API

- `/.well-known/service/health` Returns 200 when the blocklet is running, 503 otherwise
- `/.well-known/service/api/did/session` Get the current login user information
