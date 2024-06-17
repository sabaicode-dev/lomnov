// src/components/ContainerHeader/ContainerHeader.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ContainerHeader, { MenuProp } from './ContainerHeader';
import { action } from '@storybook/addon-actions';
import { within, userEvent } from '@storybook/testing-library';

// Sample menu data
const sampleMenu = [
  { id: 1, name: 'Home', slug: '/', lang: 'en' },
  { id: 2, name: 'About', slug: '/about', lang: 'en' },
  { id: 3, name: 'Contact', slug: '/contact', lang: 'en' },
];

export default {
  title: 'Components/ContainerHeader',
  component: ContainerHeader,
  argTypes: {
    menu: {
      control: 'object',
    },
  },
} as Meta<MenuProp>;

// Template for the ContainerHeader component
const Template: StoryFn<MenuProp> = (args: MenuProp) => <ContainerHeader {...args} />;

// Default story for ContainerHeader
export const Default = Template.bind({});
Default.args = {
  menu: sampleMenu,
};

// Story with the menu opened
export const MenuOpened = Template.bind({});
MenuOpened.args = {
  menu: sampleMenu,
};

MenuOpened.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);
  const menuButton = await canvas.getByRole('button');
  await userEvent.click(menuButton);
  action('Menu toggled')();
};
