import type {Story} from '@storybook/react';
import SomeComponent, {SomeComponentProp} from '@components/SomeComponent';
import {ThemeProvider} from 'styled-components';
import {theme} from '../utils/style/theme';
import {GlobalStyle} from '../utils/style/global';
import React from 'react';

export default {
  component: SomeComponent,
  title: 'Atoms/SomeComponent'
};

const Template: Story<SomeComponentProp> = args => (
  <>
    <GlobalStyle/>
    <ThemeProvider theme={theme}>
      <SomeComponent {...args}/>
    </ThemeProvider>
  </>
);

export const Default = Template.bind({});
Default.args = {};
