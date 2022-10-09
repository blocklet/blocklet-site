const samplesData = [
  {
    name: 'minimalist-html-demo',
    displayName: 'Simple HTML Demo',
    desc: {
      en: 'This is a blocklet demo of the 2048 game used to demonstrate how to install and run a blocklet on your Blocklet Server.',
      zh: '这是一个 2048 游戏的 blocklet 示例，用于演示如何在你的 Blocklet Server 上安装和运行 blocklet。',
    },
    blockletType: 'static',
    composable: true,
    framework: 'N/A',
    languages: 'JavaScript',
    useCase: 'Static webapp wrapper',
    author: 'mave99a',
    repo: 'https://github.com/blocklet/minimalist-html-demo',
    store: 'https://dev.store.blocklet.dev/blocklets/z8iZjejYpy7TeJbTq6oXLbVgXemAMbpqwM17Q',
  },
  {
    name: 'html-2048-sample',
    displayName: 'Static Demo',
    desc: {
      en: 'The most basic blocklet, with only one HTML page',
      zh: '只包含一个 HTML 页面的最简单的 blocklet',
    },
    blockletType: 'static',
    composable: true,
    framework: 'N/A',
    languages: 'JavaScript',
    useCase: 'N/A',
    author: 'linchen1987',
    repo: 'https://github.com/blocklet/html-2048-sample',
    store: 'https://test.store.blocklet.dev/blocklets/z8iZwyBfqwNcGbLCiUnFAQLEzT8sJd2TSjbM2',
  },
  {
    name: 'react-demo',
    displayName: 'React Demo',
    desc: {
      en: 'A front-end application built with React and CRA',
      zh: '一个基于 React 和 CRA 构建的前端应用',
    },
    blockletType: 'static',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'linchen1987',
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
