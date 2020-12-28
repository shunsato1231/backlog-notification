import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import { Icon, IconProps } from './Icon.component'

export default {
  title: 'atoms/Icon',
  component: Icon
} as Meta;


const Template: Story<IconProps> = (args) => <Icon {...args}/>;

export const Help = Template.bind({});
Help.args = {
  theme: 'help'
}

export const Search = Template.bind({});
Search.args = {
  theme: 'search'
}

export const Loading = Template.bind({});
Loading.args = {
  theme: 'loading'
}