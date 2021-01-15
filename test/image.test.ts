import path from 'path'
import { pathToFileURL } from 'url'
import initStoryshots from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'

initStoryshots({
  suite: 'Image storyshots',
  test: imageSnapshot({
    storybookUrl: pathToFileURL(path.resolve(__dirname, '../storybook-static')).href
  }),
  configPath: path.resolve(__dirname, '../.storybook'),
})