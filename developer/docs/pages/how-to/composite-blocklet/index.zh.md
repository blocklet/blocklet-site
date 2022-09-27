---
title: 创建组合 Blocklet
description: 创建组合 Blocklet
layout: documentation
---

每一个 blocklet 既是应用，也是组件。 每一个 blocklet 都可以被其他的 blocklet 组合，也可以组合其他的 blocklet.

组合在一起的 blocklet 中，每一个组件是一个单独的服务，它们通过统一的配置和 UI, 使你感觉像在使用一个完整的应用。

## 概念

- **Blocklet App**: 在 Blocklet Server 中安装的 Blocklet, 可以是独立 Blocklet, 也可以是组合了其他 Component 的 Blocklet.
- **Blocklet Component**: 被 Blocklet App 或 Blocklet Component 组合的 Blocklet.

## 添加组件

在项目根目录下执行 `blocklet add --store <store-url> --title xxx --mount-point /xxx` 命令添加组件

你可以在任意商店的组件详情页中看到添加组件的命令，比如，如果你想添加 DID Comments, 可以在它的 [详情页](https://store.blocklet.dev/blocklets/z8ia1WEiBZ7hxURf6LwH21Wpg99vophFwSJdu) 中找到命令 `blocklet add did-comments --store=https://store.blocklet.dev`

- `name`: 组件在商店中的 ID
- `--store`: 组件在哪个商店
- `--title`: 你可以为组件自定义不同的名称
- `--mount-point`: 组件的挂载点 如果你填写了 '/my-prefix'，那么所有以其为前缀的请求都会被转发到配置的组件

执行命令后，组件信息会被添加到 `blocklet.yml` 中

```yml
components:
  - name: xxxx
    mountPoint: /xxxx
    source:
      store: https://xxxxxxxxx
      name: xxxx
      version: latest
```

示例：[https://github.com/blocklet/component-demo/blob/main/blocklet.yml](https://github.com/blocklet/component-demo/blob/main/blocklet.yml)

详见 [Blocklet Meta: Components](/reference/blocklet-spec#Components)

## 删除组件

执行 `blocklet remove <name>` 删除组件

执行命令后，组件信息将从 `blocklet.yml` 中移除。

## 添加付费组件

添加付费组件和添加免费组件的方式相同。

如果你添加了付费组件，则 blocklet 的价格不能少于付费组件的售价之和。

组件的售价可以在组件详情页中查看。

## Blocklet UI

为了统一组合 blocklet 中每一个组件的 UI，你需要做两件事

1. 配置: 在 各个组件的 `blocklet.yml` 中配置组合信息
2. 在各个组件的页面中使用统一组件：`@blocklet/ui`

示例：Component Demo

- [Source Code](https://github.com/blocklet/component-demo)
- [Blocklet](https://dev.store.blocklet.dev/blocklets/z8iZoDztjkY82fsU26vwE8M94eHDK4tjwrFgd)

### 配置 Navigation

应用的 navigation 会显示在页面中。

navigation 有 2 中配置方式

**1. 在应用的 blocklet.yml 中配置 navigation**

```yml
# app/blocklet.yml

navigation:
  - title: xxx
    link: xxx
```

**2. 在组件的 blocklet.yml 中配置 navigation**

```yml
# app/blocklet.yml

components:
  - name: component1
navigation:
  - title: xxx
    component: component1
```

```yml
# component/blocklet.yml

navigation:
  - title: xxx
    link: xxx
```

**navigation section**

navigation section 指定 navigation 出现在哪里

- 默认: 出现在 header 中
- footer: 出现在 footer 中
- dashboard: 出现在管理后台中

你还可以为每一个导航添加 icon, i18n 等，详见 [Blocklet Meta: Navigation](/reference/blocklet-spec#Navigation,%20Theme,%20Copyright)

### 配置 Theme

见 [Blocklet Meta: Theme](/reference/blocklet-spec#Navigation,%20Theme,%20Copyright)

### 配置 Copyright

见 [Blocklet Meta: Copyright](/reference/blocklet-spec#Navigation,%20Theme,%20Copyright)

### 在各个组件的页面中使用统一组件

- @blocklet/ui-react/lib/Header: 统一 header
- @blocklet/ui-react/lib/Footer: 统一 footer
- @blocklet/ui-react/lib/Dashboard: 管理页面中的统一 sidebar

详见 [Blocklet UI](/reference/blocklet-ui)

## 组件间通信

```js
const { component } = require('@blocklet/sdk');

(async () => {
  await component.call(name, path, data);
})();
```

## 开发组合型应用

开发组合型应用和开发单体应用相同，见 [Develop Blocklet](guide/develop)

## 开发组件

见 [Blocklet Component](guide/component)

<!-- ## 同时开发应用和组件 -->
