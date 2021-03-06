import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Input, InputProps } from './Input';

export default {
  title: 'Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Text = Template.bind({});
Text.args = {
  placeholder: 'Text',
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  placeholder: 'Password',
};
