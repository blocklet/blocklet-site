---
title: Create Composite Blocklet
description: Create Composite Blocklet
layout: documentation
---

Each blocklet is both an application and a component. Each blocklet can be composed by other blocklets, and can also be composed of other blocklets.

In a blocklet grouped together, each component is a separate service that, through unified configuration and UI, makes you feel like you're using a complete application.

## Concept

- **Blocklet App**: The Blocklet installed in the Blocklet Server can be an independent Blocklet or a Blocklet combined with other Components.
- **Blocklet Component**: Blocklets that are composed by Blocklet App or Blocklet Component.

## Add component

Execute the `blocklet add <name> --store <store-url> --title xxx --mount-point /xxx` command in the project root directory to add components

You can see the command to add a component in the component details page of any store. For example, if you want to add DID Comments, you can go to its [details page](https://store.blocklet.dev/blocklets/z8ia1WEiBZ7hxURf6LwH21Wpg99vophFwSJdu) Find the command `blocklet add did-comments --store=https://store.blocklet.dev`

- `name`: the id of the component in the store
- `--store`: which store the component is in
- `--title`: you can customize different names for components
- `--mount-point`: the mount point of the component If you fill in '/my-prefix', then all requests prefixed with it will be forwarded to the configured component

After executing the command, component information will be added to `blocklet.yml`

```yml
components:
  - name: xxxx
    mountPoint: /xxxx
    source:
      store: https://xxxxxxxxx
      name: xxxx
      version: latest
```

Example: [https://github.com/blocklet/component-demo/blob/main/blocklet.yml](https://github.com/blocklet/component-demo/blob/main/blocklet.yml)

See [Blocklet Meta: Components](/reference/blocklet-spec#components)

## Remove component

Execute `blocklet remove <name>` to remove the component

After executing the command, the component information will be removed from `blocklet.yml`.

## Add paid component

Adding paid component is the same as adding free component.

If you add paid component, the price of the blocklet cannot be less than the sum of the selling price of the paid components.

The selling price of the component can be viewed on the component details page.

:::Alert
Blocklet development with paid components is not yet supported
:::

## Blocklet UI

To uniformly compose the UI of each component in the blocklet, you need to do two things

1. Configuration: Configure the combination information in the `blocklet.yml` of each component
2. Use the unified component in the page of each component: `@blocklet/ui-react`

Example: Component Demo

- [Source Code](https://github.com/blocklet/component-demo)
- [Blocklet](https://dev.store.blocklet.dev/blocklets/z8iZoDztjkY82fsU26vwE8M94eHDK4tjwrFgd)

### Configure Navigation

The app's navigation is displayed on the page.

There are 2 ways to configure the navigation

**1. Configure navigation in the application's blocklet.yml**

```yml
# app/blocklet.yml

navigation:
  - title: xxx
    link: xxx
```

**2. Configure navigation in the component's blocklet.yml**

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

The navigation section specifies where the navigation appears

- Default: appear in header
- footer: appear in footer
- dashboard: Appears in the management background

You can also add icon, i18n, etc. to each navigation, see [Blocklet Meta: Navigation](/reference/blocklet-spec#navigation)

### Configure Theme

See [Blocklet Meta: Theme](/reference/blocklet-spec#theme)

### Configuration Copyright

See [Blocklet Meta: Copyright](/reference/blocklet-spec#copyright)

### Use unified components in each component's page

- @blocklet/ui-react/lib/Header: unified header
- @blocklet/ui-react/lib/Footer: unified footer
- @blocklet/ui-react/lib/Dashboard: Unified sidebar in admin page

See [Blocklet UI](/reference/blocklet-ui) for details

## Inter-component communication

```js
const { component } = require('@blocklet/sdk');

(async () => {
  await component.call(name, path, data);
})();
```

## Develop composable applications

Developing a compositional application is the same as developing a monolithic application, see [Develop Blocklet](guide/develop)

##Development components

See [Blocklet Component](guide/component)

<!-- ## Develop multiple blocklets in parralel -->
