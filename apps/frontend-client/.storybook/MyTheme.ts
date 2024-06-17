// .storybook/MyTheme.js

import { create } from "@storybook/theming/create";

export default create({
  base: "dark",

  // Brand
  brandTitle: "Lomnov",
  brandUrl: "#",
  brandImage: "/logo-main.png",
  brandTarget: "_self",

  // Colors
  colorPrimary: "#c8412d", // Red
  colorSecondary: "#00bcf0", // Blue Sky

  // UI
  appBg: "#303539", // Dark gray background
  appContentBg: "#e1ebed", // Light gray content background
  appBorderColor: "#00bcf0", // Blue sky for borders
  appBorderRadius: 8,

  // Typography
  fontBase: '"Orbitron", sans-serif',
  fontCode: '"Fira Code", monospace',

  // Text colors
  textColor: "#fbb829", // Light gray text
  textInverseColor: "#303539", // Dark gray text on light background

  // Toolbar default and active colors
  barTextColor: "#ffe556", // Yellow for toolbar text
  barSelectedColor: "#c8412d", // Red for selected toolbar items
  barBg: "#303539", // Dark gray toolbar background

  // Form colors
  inputBg: "#e1ebed", // Light gray input background
  inputBorder: "#00bcf0", // Blue sky for input borders
  inputTextColor: "#303539", // Dark gray input text
  inputBorderRadius: 4,
});
