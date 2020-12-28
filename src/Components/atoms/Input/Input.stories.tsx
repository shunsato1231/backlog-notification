import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import { Input, InputProps } from './Input.component'

export default {
  title: 'atoms/Input',
  component: Input
} as Meta;


const Template: Story<InputProps> = (args) => <Input {...args}/>;

export const DefaultInput = Template.bind({});
DefaultInput.args = {
  theme: 'default',
  placeholder: 'default input'
}

export const SearchInput = Template.bind({});
SearchInput.args = {
  theme: 'search',
  placeholder: 'search input',
  height: 28
}

