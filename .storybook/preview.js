import { setCustomElements } from '@storybook/web-components';
import customElements from '../custom-elements.json';

setCustomElements(customElements);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const generateStories = () => {
  const storiesCtx = require.context('../stories', true, /\.stories\.(jsx|tsx|mdx)$/)
  const litCtx = require.context('../stories', true, /\.(ts)$/)
  const litRoutes = litCtx.keys()
  const storyRoutes = storiesCtx.keys();

  storyRoutes.forEach(storyRoute => {
    // get Story object.
    const _export = storiesCtx(storyRoute).default;

    console.log(_export)
  })
}

generateStories()