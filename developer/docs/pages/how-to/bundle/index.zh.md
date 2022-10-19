---
title: Bundle your blocklet
description: Bundle your blocklet
layout: documentation
---

在发布 blocklet 之前，你必须打包你的 blocklet。在本文中你将学会如何打包一个blocklet。

## 准备工作

### Logo（必要）

对于每一个被 `bundle` 的 `blocklet` 而言，logo 文件是必要的。

#### 先决条件

- logo 的宽高必须相同
- logo 的像素不能小于 256px \* 256px（svg 文件除外）
- logo 的文件大小不得超过 100KB
- logo 的格式必须是主流的图片格式（支持 svg, jpg, png等）

#### 定义 logo 字段

你需要在 `blocklet.yml` 文件中定义 logo 文件存放的路径。

```yml
logo: logo.png
```

### 使用文档（必要）

#### 先决条件

每个 blocklet 都应该有自己的使用文档，简单易上手的使用文档更能吸引用户去下载安装它。


#### 编写文档

现在，你只需要使用 markdown 语法在项目根目录下创建一个 `blocklet.md` 文件，无需在 `blocklet.yml` 声明这个文件，打包的时候会系统会自动识别这个文件。

```markdown
# My Blocklet

Welcome to my blocklet
```

另外，如果项目根目录下不存在 `blocklet.md` 文件，系统会有序地在项目根目录下继续匹配 `blocklet.en.md`，`README.md` 文件。
如果系统最终查找失败，会在打包时抛出错误并中断当前的打包行为。

### 截图（可选）

```yml

```

### changelog.md

```

```

## 打包应用

<!-- @see： https://github.com/blocklet/blocklet-site/pull/60#issuecomment-1281723839 -->

### 默认的打包模式

如果 blocklet 是通过 `blocklet create` 或 `create-blocklet` 创建的，那么可以直接通过以下命令完成打包行为:

```
yarn bundle
```

### 自定义打包模式

#### 基于 zip 打包

#### 基于 webpack 打包


### 打包单应用和 monorepo 应用


#### 打包单个应用

#### 基于 monorepo 打包

