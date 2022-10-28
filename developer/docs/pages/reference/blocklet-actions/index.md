---
title: GitHub Actions
description: For a modern application, we should spend more time on the development project rather than dealing with the packaging process of each release instead. This article will make it easier for you to use GitHub Actions to improve your productivity.
layout: documentation
---

If you are using GitHub Actions to manage the process of packaging, publishing, and deploying Blocklet applications, then you will more efficient Blocklet application deployment guide in this article.

## What is action workflow?

[action-workflow](https://github.com/blocklet/action-workflow) is a quick release process that we have learned from our extensive Blocklet application development practice.

With action-workflow, we can quickly configure the flow in CI for each Blocklet application, saving development time and debugging time cost in CI.

## How to use action workflow?

First your project needs to create a `.github` folder to enable the [GitHub Actions](https://docs.github.com/en/actions) feature

Then create a `workflows/main.yml` file in `.github` and configure some necessary initialization processes. Such as `git checkout`, `dependencies install`, etc. A full example can be found here: [Blocklet Site](https://github.com/blocklet/publish-kit/blob/master/.github/workflows/main.yml)

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

### Function Introduction

Blocklet action-workflow consists of five major functions: environment preparation, project packaging, uploading to Blocklet Store, deploying to Blocklet Server, and releasing to Github Release.

The following is a detailed description of action-workflow by function:

#### Base configuration
- `working-directory`: The directory where the Blocklet action-workflow is executed, often used in monorepo, where multiple Blocklet applications need to be packaged, uploaded and released at the same time, default is `. /`

#### Environment Preparation

- `skip-deps`: Whether to skip the blocklet-server environment preparation step, default is ``false`''

#### Bundle

- `skip-bundle`: Whether to skip the bundle step, default is ``false`''
- `bundle-command`: The command to package Blocklet applications, usually `npm run bundle`, if `skip-bundle` is not `true`, then this item is required

#### Upload to Blocklet Store
- `skip-upload`: Whether to skip uploading Blocklet applications to Blocklet Store, default is `true`.
- `store-endpoint`: The URL of the Blocklet Store, you can freely configure which Blocklet Store you need to upload the application to, if `skip-upload` is not `true`, then this item is required
- `store-access-token`: The key applied in Blocklet Store, you need to register as the developer of the corresponding Blocklet Store first, then apply for an upload key, if `skip-upload` is not `true`, then this item is required. For more details, please refer to: [Blocklet Store](https://store.blocklet.dev/docs)
- `store-developer-did`: The developer ID of the developer in the corresponding Blocklet Store, this item is required when you need to upload a paid Blocklet. For more details, please refer to: [Blocklet Store](https://store.blocklet.dev/docs)

#### Deploy to Blocklet Server
- `skip-deploy`: Whether to skip the step of deploying the Blocklet application to the specified Blocklet Server, default is `true`.
- `server-endpoint`: The address of the Blocklet Server to be deployed, if `skip-deploy` is not empty. For more details, please refer to: [Blocklet Deploy](/reference/blocklet-cli#deploy)
- `server-access-key`: Access Key created in Blocklet Server, if `skip-deploy` is not empty. For more details, please refer to: [Blocklet Deploy](/reference/blocklet-cli#deploy)
- `server-access-secret`: The Access Secret `skip-deploy` created in Blocklet Server is not empty. For more details, please refer to: [Blocklet Deploy](/reference/blocklet-cli#deploy)
- `deploy-app-did`: Under which Blocklet application the current application will be deployed (become its sub-component), if you need to deploy the application as a sub-component, you need to fill in this item. For more details, please refer to: [Blocklet Deploy](/reference/blocklet-cli#deploy)
- `deploy-mount-point`: The path where the application is mounted when it is deployed as a subcomponent, if you need to deploy the application as a subcomponent, you need to fill in this item. For more details, please refer to: [Blocklet Deploy](/reference/blocklet-cli#deploy)
- `slack-webhook`: Configure a slack webhook to send a slack notification when the Blocklet application is successfully deployed.

#### Release to Github Release
- `skip-release`: Whether to skip the release Github Release step, default is `false`
- `skip-readme`: Whether to skip the step of updating the `README.md` file, default is `false`
- `github-token`: Configure a `token` with `write` permissions that will be used to update the project's `README.md` file in CI


### Usage Scenarios
The following is a description of how action-workflow can be combined in each scenario
#### Upload blocklet to Blocklet Store
After completing the development of the application, you want to be able to publish the latest code to the Blocklet Store every time, this time you need to use the `Environment Preparation`, `Bundle`, `Upload to Blocklet Store` steps, refer to the following code:
```yaml
- name: Upload to Blocklet Store
  uses: blocklet/action-workflow@v1
  with:
    skip-deps: false
    skip-bundle: false
    skip-upload: false
    skip-deploy: true
    skip-release: true
    skip-readme: true
    bundle-command: npm run bundle
    store-endpoint: ${{ secrets.STORE_ENDPOINT }}
    store-access-token: ${{ secrets.STORE_ACCESS_TOKEN }}
    store-developer-did: ${{ secrets.STORE_DEVELOPER_DID }}
```

#### Deploy blocklet to Blocklet Server
In some cases, you do not want to publish the application to the Blocklet Store, but deploy it directly to a specified Blocklet Server, you need to use the `Environment Preparation`, `Bundle`, `Deploy to Blocklet Server` steps, refer to the following code:
```yaml
- name: Deploy to Blocklet Server
  uses: blocklet/action-workflow@v1
  with:
    skip-deps: false
    skip-bundle: false
    skip-upload: true
    skip-deploy: false
    skip-release: true
    skip-readme: true
    bundle-command: npm run bundle
    server-endpoint: ${{ secrets.XMARK_NODE_ENDPOINT }}
    server-access-key: ${{ secrets.XMARK_NODE_ACCESS_KEY }}
    server-access-secret: ${{ secrets.XMARK_NODE_ACCESS_SECRET }}
    slack-webhook: xxxxxx
```

If the application needs to be deployed as a component blocklet of another blocklet, it can be configured by adding the following parameters:
```yaml
deploy-app-did: xxxxxx
deploy-mount-point: xxxxxx
```

#### Release to Github Release
In some cases, you want to package the current application for an archive, and then install and run it in the future through Blocklet Server, you need to use the `Environment Preparation`, `Bundle`, `Release to Github Release` steps, refer to the following code.
```yaml
- name: Release to Github Release
  uses: blocklet/action-workflow@v1
  with:
    skip-deps: false
    skip-bundle: false
    skip-upload: true
    skip-deploy: true
    skip-release: false
    skip-readme: true
    bundle-command: npm run bundle
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

#### Other situations
The above three cases describe three common scenarios, sometimes you need to combine the above three scenarios to meet the use of more cases. For example, if you need to publish to Blocklet Store and deploy to Blocklet Server at the same time, you can combine the above described configuration by referring to the following code:

```yaml
- name: Upload to Blocklet Store & Deploy to Blocklet Store
  uses: blocklet/action-workflow@v1
  with:
    skip-deps: false
    skip-bundle: false
    skip-upload: false
    skip-deploy: false
    skip-release: true
    skip-readme: true
    bundle-command: npm run bundle
    store-endpoint: ${{ secrets.STORE_ENDPOINT }}
    store-access-token: ${{ secrets.STORE_ACCESS_TOKEN }}
    store-developer-did: ${{ secrets.STORE_DEVELOPER_DID }}
    server-endpoint: ${{ secrets.XMARK_NODE_ENDPOINT }}
    server-access-key: ${{ secrets.XMARK_NODE_ACCESS_KEY }}
    server-access-secret: ${{ secrets.XMARK_NODE_ACCESS_SECRET }}
    slack-webhook: xxxxxx
```
