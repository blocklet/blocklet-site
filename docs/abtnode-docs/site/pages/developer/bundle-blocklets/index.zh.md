---
title: '打包 Blocklet'
description: '打包 Blocklet'
keywords: 'blocklet server, blocklet'
author: 'wangshijun'
category: ''
layout: 'documentation'
tags:
  - 'blocklet server'
---

Blocklets 在被部署到 Blocklet Server 实例上之前需要被打包处理。Blocklet 的打包流程和传统的 Web 应用打包非常相似，下面是教你如何打包 JavaScript Blocklet 的指引教程。

### 打包前端

如果你的 Blocklet 是使用前端框架比如 React.js，Vue.js 构建的， 你必须将他们打包成能被 Web 服务器部署服务的静态资源文件。

#### 1. 获取 Blocklet DID

进入到你的 Blocklet 目录下运行 `blocklet meta | grep did` 命令获得 blocklet did：

```shell
blocklet meta | grep did
did:         z8iZn18zGRm5veEdhmrS2FRrUyw5ZAQcewVMH
```

#### 2. 更改资源路径

对于使用 `create-react-app` 创建的项目，你可以使用下面的脚本来打包前端部分：

```json
"build:client": "PUBLIC_URL=\"/z8iZn18zGRm5veEdhmrS2FRrUyw5ZAQcewVMH\" react-scripts build",
```

请一定记得将 blocklet did 更换成你自己的。

#### 3. 使用 `%PUBLIC_URL%` 加载资源文件

请将 `public/index.html` 加上 `%PUBLIC_URL%` 前缀以加载所有的资源，像下面这样：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <!--
  manifest.json provides metadata used when your web app is installed on a
  user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
-->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
  Notice the use of %PUBLIC_URL% in the tags above.
  It will be replaced with the URL of the `public` folder during the build.
  Only files inside the `public` folder can be referenced from the HTML.

  Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
  work correctly both with client-side routing and a non-root public URL.
  Learn how to configure a non-root public URL by running `npm run build`.
-->
    <link rel="stylesheet" type="text/css" href="%PUBLIC_URL%/icons/css/all.css" />
    <script src="%PUBLIC_URL%/api/session/env"></script>
    <title>Blockchain Manager</title>
  </head>

  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
  This HTML file is a template.
  If you open it directly in the browser, you will see an empty page.

  You can add webfonts, meta tags, or analytics to this file.
  The build step will place the bundled scripts into the <body> tag.

  To begin the development, run `npm start` or `yarn start`.
  To create a production bundle, use `npm run build` or `yarn build`.
-->
  </body>
</html>
```

#### 4. 注入 Blocklet 信息脚本

然后在 head 标签中添加一个 script 标签来加载 Blocklet 信息：

```html
<script src="__meta__.js"></script>
```

这个 script 将会从任何路径加载，返回的内容如下：

```javascript
window.blocklet = {
  did: 'z8ia4e5vAeDsQEE2P26bQqz9oWR1Lxg9qUMaV',
  name: 'static-demo-blocklet',
  version: '0.9.0',
  prefix: '/admin/static-demo-blocklet/',
};
```

#### 5. 更新前端的路由配置

如果你使用的是一个前端路由，动态设置路由的 base 才能让前端页面正确工作：

```jsx
<Router basename={window.blocklet ? window.blocklet.prefix : window.env.apiPrefix}>
  <WrappedApp />
</Router>
```

### 6. 适配 ajax 请求

如果你正在使用 ajax 库比如 axios，请做如下更改：

```javascript
import axios from 'axios';

axios.defaults.baseURL = '';
axios.defaults.timeout = 200000;

axios.interceptors.request.use((config) => {
  const prefix = window.blocklet ? window.blocklet.prefix : window.env.apiPrefix;
  config.baseURL = prefix || '';

  return config;
});
```

### 打包后端

使用下面的脚本打包后端：

```json
"build:server": "DEBUG=@abtnode/* NODE_ENV=production blocklet bundle -w api/webpack.blocklet.js",
```

因为我们内部使用 webpack 来打包 Blocklet 后端，你可以自定义配置:

```js
export default (webpack) => {
  return {
    optimization: {
      nodeEnv: false, // @link https://github.com/webpack/webpack/issues/7470#issuecomment-394259698
    },
    plugins: [
      new webpack.DefinePlugin({
        '_process.env.NODE_ENV': JSON.stringify(_process.env.NODE_ENV || 'development'),
      }),
    ],
  };
};
```
