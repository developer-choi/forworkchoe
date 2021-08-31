const path = require('path');

module.exports = {
  // Created by cli
  stories: [
    '../src/**/*.stories.@(ts|tsx)'
  ],
  // Created by cli
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  
  /**
   * 출처를 찾지 못했습니다. react-playground 프로젝트에서 소스코드를 가져왔습니다.
   * 추가한 이유는 import alias를 storybook에서 인식하지 못하는 문제가 있었기 때문입니다.
   */
  webpackFinal: async config => {
    config.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules'];
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, '../src/components')
    };
    return config;
  }
};
