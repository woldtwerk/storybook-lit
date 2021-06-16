// import { html } from 'lit-html'
// import { html } from 'lit/static-html.js';
import { html, attr } from '@helper/lit'
import { Story } from '@storybook/web-components'

export default {
  title: 'Example/custom',
  component: 'ue-back-top',
};

const Template: Story<Partial<any>> = (args) => html`<h1 ${attr(args)}>slot</h1>`

export const Primary = Template.bind({})
Primary.args = {
  threshold: 1,
  top: 2,
}