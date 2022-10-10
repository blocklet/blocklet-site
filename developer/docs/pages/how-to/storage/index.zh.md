---
title: Blocklet Storage
description: Blocklet Storage
layout: documentation
---

## Using local database

### Local Storage

你可以使用 Blocklet SDK 获取 blocklet 的存储目录

```js
const fs = require('fs');
const { env } = require('@blocklet/sdk');

fs.writeFileSync(path.join(env.dataDir, 'data.txt'), 'blocklet data');
```

### File Database

Blocklet SDK 为 blocklet 提供一个基于文件的数据库

见 [Blocklet SDK: Database](/reference/blocklet-sdk#database)

<!-- ## Using browser database -->

<!-- ## Using Remote database -->

<!-- ## Using decentralized data store -->
