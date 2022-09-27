---
title: Github Actions
description: For a modern application, we should spend more time on the development project rather than dealing with the packaging process of each release instead. This article will make it easier for you to use Github Actions to improve your productivity.
layout: documentation
---

If you are using Github Actions to manage the process of packaging, publishing, and deploying Blocklet applications, then you will more efficient Blocklet application deployment guide in this article.


## What is action workflow?
[action-workflow](https://github.com/blocklet/action-workflow) is a quick release process that we have learned from our extensive Blocklet application development practice.

With action-workflow, we can quickly configure the flow in CI for each Blocklet application, saving development time and debugging time cost in CI.

## How to use action workflow?

First your project needs to create a `.github` folder to enable the [Github Actions](https://docs.github.com/en/actions) feature

Then create a `workflows/main.yml` file in `.github` and configure some necessary initialization processes. Such as `git checkout`, `dependencies install`, etc.

Once everything is in place, add the following to access the Blocklet action-workflow functionality.
```yaml
- name: Deploy Blocklet Site
  uses: blocklet/action-workflow@v1
  with:
    skip-deps: false
    skip-bundle: false
    skip-upload: false
    skip-deploy: false
    skip-release: false
    skip-readme: false
    working-directory: . /
    bundle-command: npm run bundle
    store-endpoint: ${{ secrets.STORE_ENDPOINT }}
    store-access-token: ${{ secrets.STORE_ACCESS_TOKEN }}
    store-developer-did: ${{ secrets.STORE_DEVELOPER_DID }}
    server-endpoint: ${{ secrets.XMARK_NODE_ENDPOINT }}
    server-access-key: ${{ secrets.XMARK_NODE_ACCESS_KEY }}
    server-access-secret: ${{ secrets.XMARK_NODE_ACCESS_SECRET }}
    deploy-app-did: xxxxxx
    deploy-mount-point: xxxxxx
    slack-webhook: xxxxxx
    github-token: xxxxx
```

- `skip-deps`: Whether to skip the blocklet-server environment preparation step, default is ``false`''
- `skip-bundle`: Whether to skip the bundle step, default is ``false`''
- `skip-upload`: Whether to skip uploading Blocklet applications to Blocklet Store, default is `true`.
- `skip-deploy`: Whether to skip the step of deploying the Blocklet application to the specified Blocklet Server, default is `true`.
- `skip-release`: Whether to skip the release Github Release step, default is `false`
- `skip-readme`: Whether to skip the step of updating the `README.md` file, default is `false`
- `working-directory`: The directory where the Blocklet action-workflow is executed, often used in monorepo, where multiple Blocklet applications need to be packaged, uploaded and released at the same time, default is `. /`
- `bundle-command`: The command to package Blocklet applications, usually `npm run bundle`, if `skip-bundle` is not `true`, then this item is required
- `store-endpoint`: The URL of the Blocklet Store, you can freely configure which Blocklet Store you need to upload the application to, if `skip-upload` is not `true`, then this item is required
- `store-access-token`: The key applied in Blocklet Store, you need to register as the developer of the corresponding Blocklet Store first, then apply for an upload key, if `skip-upload` is not `true`, then this item is required. For more details, please refer to: [Blocklet Store](https://store.blocklet.dev/docs)
- `store-developer-did`: The developer ID of the developer in the corresponding Blocklet Store, this item is required when you need to upload a paid Blocklet. For more details, please refer to: [Blocklet Store](https://store.blocklet.dev/docs)
- `server-endpoint`: The address of the Blocklet Server to be deployed, if `skip-deploy` is not empty. For more details, please refer to: [Blocklet Deploy](/reference/blocklet-cli#Deploy)
- `server-access-key`: Access Key created in Blocklet Server, if `skip-deploy` is not empty. For more details, please refer to: [Blocklet Deploy](/reference/blocklet-cli#Deploy)
- `server-access-secret`: The Access Secret `skip-deploy` created in Blocklet Server is not empty. For more details, please refer to: [Blocklet Deploy](/reference/blocklet-cli#Deploy)
- `deploy-app-did`: Under which Blocklet application the current application will be deployed (become its sub-component), if you need to deploy the application as a sub-component, you need to fill in this item. For more details, please refer to: [Blocklet Deploy](/reference/blocklet-cli#Deploy)
- `deploy-mount-point`: The path where the application is mounted when it is deployed as a subcomponent, if you need to deploy the application as a subcomponent, you need to fill in this item. For more details, please refer to: [Blocklet Deploy](/reference/blocklet-cli#Deploy)
- `slack-webhook`: Configure a slack webhook to send a slack notification when the Blocklet application is successfully deployed.
- `github-token`: Configure a `token` with `write` permissions that will be used to update the project's `README.md` file in CI
