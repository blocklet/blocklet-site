---
title: 'Using Blocklet SDK'
layout: 'documentation'
---

Blocklet SDK provides the interface between Blocklet and Blocklet Service for developers, and developers call the services provided by Blocklet Service through Blocklet SDK.

## APP Wallet

See [Blocklet SDK: Wallet](/apis/blocklet-sdk#Wallet)

## DID Connect

See [Blocklet SDK: DID Connect](/apis/blocklet-sdk#DID%20Connect)

## User and Permissions

Get user information and manage user permissions [Blocklet SDK: Auth](/apis/blocklet-sdk#Auth)

Obtain the identity of the request through middleware, perform permission management and interception: [Blocklet SDK: Middleware](/apis/blocklet-sdk#Middleware)

## Notification

After the DID Wallet interacts with the Blocklet, it will automatically establish a connection with the Blocklet. The Blocklet can send a message to the specified DID Wallet, and broadcast messages to all connected DID Wallets.

Blocklet can also listen the messages sent by the system.

See [Blocklet SDK: Notification](/apis/blocklet-sdk#Notification)

## Database

Blocklet SDK provides a file-based database, which is a wrapper around [nedb](https://www.github.com/Arcblock/nedb).

See [Blocklet SDK: Database](/apis/blocklet-sdk#Database)

## Environment and Configuration

Get the configuration information of the Blocklet and the configuration information of the component

See [Blocklet SDK: Environment](/apis/blocklet-sdk#Environment)