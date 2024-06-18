import type { Preview } from "@storybook/react";
import "../src/app/globals.css"
import "./storybook-styles.css";
import MyTheme from "./MyTheme";


const preview: Preview = {
  parameters: {
    // controls: {
    //   matchers: {
    //     color: /(background|color)$/i,
    //     date: /Date$/i,
    //   },
    // },
    docs: {
      theme: MyTheme,
    },
  },
};

export default preview;
