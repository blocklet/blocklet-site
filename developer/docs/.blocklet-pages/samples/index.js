const samplesData = [
  {
    name: 'auth-demo',
    displayName: 'Auth Demo',
    desc: {
      en: 'Blocklet that use auth by Blocklet Server Auth Service',
      zh: '演示如何使用 Blocklet Server Auth Service 实现认证功能的 Blocklet',
    },
    blockletType: 'dapp',
    composable: true,
    framework: 'React',
    languages: 'JavaScript',
    useCase: 'Authentication',
    author: 'ArcBlock',
    repo: 'https://github.com/blocklet/auth-demo',
    store: 'https://dev.store.blocklet.dev/blocklets/z8iZw1PjUeQP8yuEoBVWfcD9hft7cbUfxaTaT',
  },
  {
    name: 'component-demo',
    displayName: 'Component Demo',
    desc: {
      en: 'Combining multiple blocklets together',
      zh: '一个组合了多个子 Blocklet 的组合式 Blocklet',
    },
    blockletType: 'static',
    composable: true,
    framework: 'React',
    languages: 'JavaScript',
    useCase: 'Composable Blocklet',
    author: 'ArcBlock',
    repo: 'https://github.com/blocklet/component-demo',
    store: 'https://dev.store.blocklet.dev/blocklets/z8iZoDztjkY82fsU26vwE8M94eHDK4tjwrFgd',
  },
  {
    name: 'did-connect-v1-demo',
    displayName: 'DID Connect Demo (v1)',
    desc: {
      en: 'Blocklet that demos capabilities of DID Connect V1',
      zh: '演示 DID Connect V1 功能的 Blocklet',
    },
    blockletType: 'dapp',
    composable: true,
    framework: 'N/A',
    languages: 'JavaScript',
    useCase: 'DID Connect',
    author: 'ArcBlock',
    repo: 'https://github.com/blocklet/did-connect-v1-demo',
    store: 'https://dev.store.blocklet.dev/blocklets/z8iZucRA3xDghCnKyBCVoHYdhSU7owVukT4QZ',
  },
  {
    name: 'html-2048-sample',
    displayName: 'Static Demo',
    desc: {
      en: 'This is a Blocklet demo of the 2048 game used to demonstrate how to install and run a Blocklet on your Blocklet Server.',
      zh: '一个 2048 游戏的 Blocklet 示例，用于演示如何在你的 Blocklet Server 上安装和运行 Blocklet。',
    },
    blockletType: 'static',
    composable: true,
    framework: 'N/A',
    languages: 'JavaScript',
    useCase: 'Static Web Page',
    author: 'ArcBlock',
    repo: 'https://github.com/blocklet/html-2048-sample',
    store: 'https://test.store.blocklet.dev/blocklets/z8iZwyBfqwNcGbLCiUnFAQLEzT8sJd2TSjbM2',
  },
  {
    name: 'minimalist-html-demo',
    displayName: 'Simple HTML Demo',
    desc: {
      en: 'The most basic Blocklet, with only one HTML page',
      zh: '只包含一个 HTML 页面的最简单的 Blocklet',
    },
    blockletType: 'static',
    composable: true,
    framework: 'N/A',
    languages: 'JavaScript',
    useCase: 'Static Web Page',
    author: 'ArcBlock',
    repo: 'https://github.com/blocklet/minimalist-html-demo',
    store: 'https://dev.store.blocklet.dev/blocklets/z8iZjejYpy7TeJbTq6oXLbVgXemAMbpqwM17Q',
  },
  {
    name: 'notification-demo',
    displayName: 'Notification Demo',
    desc: {
      en: 'Blocklet that demos capabilities of Blocklet Server Notification service',
      zh: '演示 Blocklet Server 通知服务能力的 Blocklet',
    },
    blockletType: 'dapp',
    composable: true,
    framework: 'React',
    languages: 'JavaScript',
    useCase: 'Notification',
    author: 'ArcBlock',
    repo: 'https://github.com/blocklet/notification-demo',
    store: 'https://dev.store.blocklet.dev/blocklets/z8iZkfjSjGsZdR45PWXKxV3TtBx2z1tRuc8YD',
  },
  {
    name: 'payment-demo',
    displayName: 'Payment Demo',
    desc: {
      en: 'Demo blocklet that shows how developers earn crypto tokens by setting price for blocklets',
      zh: '演示开发者如何通过为 Blocklet 设置价格来赚取加密代币的 Blocklet',
    },
    blockletType: 'static',
    composable: true,
    framework: 'N/A',
    languages: 'JavaScript',
    useCase: 'Payment',
    author: 'ArcBlock',
    repo: 'https://github.com/blocklet/payment-demo',
    store: 'https://dev.store.blocklet.dev/blocklets/z8iZyFxvvqwW98MiqKv1tmws2o3iTZnTajE3B',
  },
  {
    name: 'profile-demo',
    displayName: 'Profile Demo',
    desc: {
      en: 'Blocklet that show profile of login user, can be combined by other blocklets.',
      zh: '演示查看登录用户资料的 Blocklet, 可与其它 Blocklet 组合',
    },
    blockletType: 'static',
    composable: true,
    framework: 'N/A',
    languages: 'JavaScript',
    useCase: 'Authentication',
    author: 'ArcBlock',
    repo: 'https://github.com/blocklet/profile-demo',
    store: 'https://dev.store.blocklet.dev/blocklets/z8iZqG23gxzv6CbTmtWFAipHGLjPEha4BjAtE',
  },
  {
    name: 'react-demo',
    displayName: 'React Demo',
    desc: {
      en: 'A Blocklet built with React and CRA',
      zh: '一个基于 React 和 CRA 构建的 Blocklet',
    },
    blockletType: 'static',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ArcBlock',
    repo: 'https://github.com/blocklet/html-2048-sample',
    store: 'https://test.store.blocklet.dev/blocklets/z8iZwyBfqwNcGbLCiUnFAQLEzT8sJd2TSjbM2',
  },
];

// "react-static" => "React Static"
const toDisplayName = (text) => {
  return text.replace(/(^\w|-\w)/g, (str) => str.replace(/-/, ' ').toUpperCase());
};

const getImage = (name) => {
  return new URL(`./images/${name}.png`, import.meta.url).href;
};

export const samples = samplesData.map((item) => ({
  ...item,
  displayName: item.displayName || toDisplayName(item.name),
  coverImage: getImage(item.name),
}));

const samplesKeyByName = samples.reduce((acc, cur) => ({ ...acc, [cur.name]: cur }), {});

export const findByName = (name) => samplesKeyByName[name];

export const search = (conditions = {}) => {
  return samples.filter((sample) => {
    const fields = Object.keys(conditions);
    return fields.every((field) => conditions[field] === sample[field]);
  });
};
