---
title: Bundle your blocklet
description: Bundle your blocklet
layout: documentation
---

## 定义需要打包的文件

### Logo（必要）

对于每一个被 `bundle` 的 `blocklet` 而言，logo 文件是必要的。

#### 先决条件

- logo 的宽高必须相同
- logo 的像素不能小于 256px \* 256px（svg 文件除外）
- logo 的文件大小不得超过 100KB
- logo 的格式必须是主流的图片格式（支持 svg, jpg, png等）

#### 定义 logo 字段

你需要在 `blocklet.yml` 文件中定义 logo 字段，并设置 logo 存放的路径。

```yml
// blocklet.yml
logo: logo.png
```

### 自述文件（必要）

### 先决条件

```yml

```


### 截图

```yml

```

### changelog.md

```

```

## 打包你的应用
<!--- Bunding mode: zip, webpack
- Bundling under mono-repo mode-->


