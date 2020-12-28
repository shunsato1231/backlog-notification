import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import { H2, H3, HeadingProps } from './Heading.component'

export default {
  title: 'atoms/Heading',
  argTypes: {
    innerText: { control: 'text' },
  },
} as Meta;

interface storyHeadingProps extends HeadingProps {
  innerText: string
}

const H2Template: Story<storyHeadingProps> = (args) => <H2 {...args}>{args.innerText}</H2>;
const H3Template: Story<storyHeadingProps> = (args) => <H3 {...args}>{args.innerText}</H3>;


export const H2initialSetting = H2Template.bind({});
H2initialSetting.args = {
  innerText: 'test',
  theme: 'initialSettings'
}

export const H3initialSetting = H3Template.bind({});
H3initialSetting.args = {
  innerText: 'test',
  theme: 'initialSettings'
}