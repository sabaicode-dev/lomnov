import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../node_modules/ms-ui-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn 1s ease-in-out",
        bounce: "bounce 1s infinite",
        fadeUp: 'fadeUp 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: '0' },
          "100%": { opacity: '1' },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(-25%)" },
          "50%": { transform: "translateY(0)" },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      colors: {
        "button-blue": "#0055FF",
        "button-red": "#FF0000",
        header: "#003090",
        footer: "#003090",
        default: "#333333",
        title: "#000000",
        "sub-title": "#111111",
        white: "#FFFFFF",
        "background-default": "#F2F4F8",
        transparent: "transparent",
        red: "#FF0000",
        black: "#000000",
        star: "#D1A401",
        "soft-border": "#DDDD",
        green: "#0C9000",
        gray: "#808080",
        instagram: "#C13584",
        twitter: "#1DA1F2",
        telegram: "#0088CC",
        youtube: "#ff0000",
        facebook: "#4267B2",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
export default config;
