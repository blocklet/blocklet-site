---
title: '使用 Blocklet SDK'
layout: 'documentation'
---

Blocklet SDK 为开发者提供 Blocklet 与 Blocklet Service 之间的接口，开发者通过 Blocklet SDK 调用 Blocklet Service 提供的服务。

## APP Wallet

见 [Blocklet SDK: Wallet]('/apis/blocklet-sdk##Wallet')

## DID Connect

见 [Blocklet SDK: DID Connect](/apis/blocklet-sdk##DID%20Connect)

## 用户和权限

获取用户信息，管理用户权限 [Blocklet SDK: Auth](/apis/blocklet-sdk#Auth)

通过 middleware 获取请求的身份，进行权限管理和拦截：[Blocklet SDK: Middleware](/apis/blocklet-sdk#Middleware)

## 消息通知

DID Wallet 与 Blocklet 发生了交互后，会自动和 Blocklet 建立连接，Blocklet 可以给指定的 DID Wallet 发消息，给所有连接中的 DID Wallet 广播消息。

Blocklet 还可以监听系统发来的消息。

见 [Blocklet SDK: Notification](/apis/blocklet-sdk#Notification)

## Database

Blocklet SDK 提供了一个基于文件的数据库，它是 [nedb](https://www.github.com/Arcblock/nedb) 的封装。

见 [Blocklet SDK: Database](/apis/blocklet-sdk#Database)

## 环境和配置

获取 Blocklet 的配置信息已经组件的配置信息

见 [Blocklet SDK: Environment](/apis/blocklet-sdk#Environment)
