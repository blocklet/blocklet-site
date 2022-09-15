---
title: Publish your blocklet to the world
description: Publish your blocklet to the world
layout: documentation
---

## Publish to Blocklet Store

1. Register as a developer from Blocklet Store
   - Blocklet Store is decentralized
   - Arcblock provides 2 official Store: [blocklet store](https://store.blocklet.dev/) and [blocklet store(dev)](https://dev.store.blocklet.dev/)
   - You can setup a self-hosted store refer to [Host Blocklet Store](https://store.blocklet.io/docs/en/host/launch-store)
   - You need to apply for a developer first, after the administrator has approved, you can proceed to the next step
2. Create a new access key
   - Use `blocklet connect <store-url>` command to create and access key from store
3. Bundle your blocklet
   - Refer to [Bundle your blocklet](/guide/bundle)
4. Upload your blocklet
   - Use `blocklet upload` to upload your blocklet bundle to store
5. Login to the uploaded Blocklet Store, you can see the uploaded Blocklet in the "My Blocklet" page in Admin Dashboard
6. The uploaded Blocklet is still in the "draft" status, click the "publish" button to publish

## Publish to multiple stores

- Use `blocklet connect <store-url> --profile <profile>` to save access token of different stores
- Use `blocklet upload --profile <profile>` to upload your blocklet bundle to multiple stores

<!-- ## Host with github release -->

<!-- ## Other hosting options? -->
