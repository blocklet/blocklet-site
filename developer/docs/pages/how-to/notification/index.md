---
title: Communicate with DID Wallet
description: Communicate with DID Wallet
layout: documentation
---

## Establish connection with DID Wallet

Before the Blocklet communicates with the wallet, a Websocket connection needs to be established. There are two ways for Blocklet to establish a Websocket connection with the DID Wallet:

**Method 1**: After the DID Wallet logs in to the Blocklet through the [Auth service](/how-to/auth) provided by the Blocklet Service, it automatically establishes a Weboscket connection with the Blocklet.

**Method 2**: After DID Wallet connects to Blocklet through Blocklet using the DID Connect service implemented by [Blocklet SDK](/reference/blocklet-sdk#DID-Connect), it automatically establishes a Weboscket connection with Blocklet.

You can learn the implementation through [https://github.com/blocklet/notification-demo](https://github.com/blocklet/notification-demo).

## Send message to DID Wallet

After Blocklet and DID Wallet establish a Websocket connection, notifications can be sent to DID Wallet through Blocklet SDK.

### Send message to specified user

**Method 1**: Send a 1-to-1 message to the user. If the user is not online, the message will be temporarily stored for a week, and the user will receive the message when he is online.

`Notification.sendToUser(userDid, )`

**Method 2**: Send messages to specified users through public channels. If the user is not online, messages are not staged.

`Notification.broadcast(notification, { socketDid })`

For details, see [Blocklet SDK](/reference/blocklet-sdk#Notification)

### Broadcast message to all online users

`Notification.broadcast(notification, { socketDid })`

Broadcast time to all online users, if the user is not online, the message will not be temporarily stored.

For details, see [Blocklet SDK](/reference/blocklet-sdk#Notification)

### Message Format

Message are in a similar format to emails, including text, attachments, and actions.

- Text: Contains title and body text. You can also send just the body, which is a simple text message.
- Attachment: Attachment types include Asset(NFT), VC, Token.
- Operation: You can attach an operation to the message (such as clicking to jump to a link), and the operation will be displayed in the wallet as a button.

For details, see [Blocklet SDK](/reference/blocklet-sdk#Notification)

## Receive messages from DID Wallet

Each time a connection is established with the DID Wallet, Blocklet will receive a 'hi' message from the wallet, which can be received by Blocklet through the Blocklet SDK.

After receiving this message, the Blocklet can send a separate message to the user.

For details, see [Blocklet SDK](/reference/blocklet-sdk#Notification)
