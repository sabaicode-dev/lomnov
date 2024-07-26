import type { Preview } from "@storybook/react";
import "../src/app/globals.css"




const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      // theme: MyTheme,
    },
  },
};

export default preview;
