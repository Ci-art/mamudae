import { Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { Header, HeaderProps } from './Header';

export default {
  title: 'Header',
  component: Header,
} as Meta;

export const Default: React.VFC<HeaderProps> = (args) => <Header {...args} />;
