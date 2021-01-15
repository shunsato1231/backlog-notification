import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import { H2_Help, H3_Help, HelpHeadingProps } from './HelpHeading.component'

export default {
  title: 'molecres/HelpHeading',
  argTypes: {
    innerText: { control: 'text' },
  },
} as Meta;

interface storyHelpHeadingProps extends HelpHeadingProps {
  innerText: string,
  helpLink: string,
  className?: string
  theme?: 'initialSettings',
  iconSize?: 'small' | 'middle' | 'large' | number
}

const H2Template: Story<storyHelpHeadingProps> = (args) => <H2_Help {...args}>{args.innerText}</H2_Help>;
const H3Template: Story<storyHelpHeadingProps> = (args) => <H3_Help {...args}>{args.innerText}</H3_Help>;


export const H2initialSetting = H2Template.bind({});
H2initialSetting.args = {
  innerText: 'test',
  theme: 'initialSettings',
  className: '',
  iconSize: 'small',
  helpLink: 'test.com'
}

export const H3initialSetting = H3Template.bind({});
H3initialSetting.args = {
  innerText: 'test',
  theme: 'initialSettings',
  className: '',
  iconSize: 'small',
  helpLink: 'test.com'
}
