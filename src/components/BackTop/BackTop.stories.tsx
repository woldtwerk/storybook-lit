import { html, attr } from '@helper/lit'
import { Story } from '@storybook/web-components'

export default {
  title: 'Back Top/tsx',
  component: 'back-top',
};

const Template: Story<Partial<any>> = (args) => html`<back-top ${attr(args)}></back-top>`

export const Primary = Template.bind({})
Primary.args = {
  threshold: 1,
  top: 2,
}