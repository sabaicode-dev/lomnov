import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import LoginForm, { LoginFormProps } from './LoginForm';

export default {
  title: 'Components/LoginForm',
  component: LoginForm,
  argTypes: {
    initialEmail: { control: 'text' },
    initialPassword: { control: 'text' },
    emailPlaceholder: { control: 'text' },
    passwordPlaceholder: { control: 'text' },
    emailErrorMessage: { control: 'text' },
    passwordErrorMessage: { control: 'text' },
    loginButtonText: { control: 'text' },
    registerText: { control: 'text' },
    registerLink: { control: 'text' },
    containerClasses: { control: 'text' },
    inputClasses: { control: 'text' },
    buttonClasses: { control: 'text' },
    linkClasses: { control: 'text' },
    errorClasses: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<LoginFormProps> = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialEmail: '',
  initialPassword: '',
  emailPlaceholder: 'Email',
  passwordPlaceholder: 'Password',
  emailErrorMessage: 'Email is required',
  passwordErrorMessage: 'Password must be at least 8 characters long',
  loginButtonText: 'Login',
  registerText: 'Not yet have an account?',
  registerLink: '/signup',
  containerClasses: 'space-y-7 w-full sm:w-1/2 md:w-2/5 lg:w-2/5',
  inputClasses: 'w-full px-4 py-2 rounded-md border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 bg-transparent text-base',
  buttonClasses: 'bg-blue-500 text-white px-4 py-2 w-full rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600',
  linkClasses: 'text-blue-500 font-semibold',
  errorClasses: 'text-red-500 text-sm absolute -left-[0%] top-11',
};
