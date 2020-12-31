import { addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import 'tailwindcss/tailwind.css';

addDecorator(StoryRouter());

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
