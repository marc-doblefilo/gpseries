// eslint-disable-next-line @typescript-eslint/no-var-requires

// Use the following syntax to add addons!
// rootMain.addons.push('');

module.exports = rootMain;
module.exports.addons = ['@storybook/addon-essentials'];
module.exports.stories = [
  '../src/lib/**/*.stories.mdx',
  '../src/lib/**/*.stories.@(js|jsx|ts|tsx)'
];
