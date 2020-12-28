import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from './Button.component'

export default {
  title: 'atoms/Button',
  component: Button,
  argTypes: {
    innerText: { control: 'text' },
  },
} as Meta;

interface storyButtonProps extends ButtonProps {
  innerText: string
}

const Template: Story<storyButtonProps> = (args) => <Button {...args}>{args.innerText}</Button>;

export const Default = Template.bind({});
Default.args = {
  innerText: 'Button'
}

export const Add = Template.bind({});
Add.args = {
  theme: 'add'
}

export const Delete = Template.bind({});
Delete.args = {
  theme: 'delete'
}

export const Back = Template.bind({});
Back.args = {
  theme: 'back'
}