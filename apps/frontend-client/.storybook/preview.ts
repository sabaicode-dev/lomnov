import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import "../src/app/globals.css";
import { handlers } from "../src/mocks/handlers";

// Initialize MSW for handling mock API requests
initialize();

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      // theme: MyTheme,
    },
    msw: {
      handlers,
    },
  },
  loaders: [mswLoader],
};

export default preview;
