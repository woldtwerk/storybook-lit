import { html } from 'lit-html'
import mdx from './Readme.mdx'

export default {
  title: 'Example/custom',
  component: 'ue-back-top',
};

export const Template = (args) => html`<h1>hi</h1>`

export const Primary = Template.bind({})
