import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../node_modules/ms-ui-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "Primary":"#7D7757",
        "Secondary":"#B5B49E",
        "Bg":"#E0E0DC",
        "BgSoftWhite":"#F3F4F6",
        "Positive":"#5CC184",
        "PositiuveSofrBig":"#DEF3E6",
        "Negative":"#E9678A",
        "NegativeSoftBig":"#FBE1E1",
        "Black":"#111827",
        "BlackSecondary":"#333333"
      },
      borderRadius: {
        "sm":"8px",
        "lg":"10px",
        "xls":"12px",
        "full":"50px",
      },
      fontFamily : {
        "Inter":"inter",
        "DM Sans":"DM Sans"
      },
      fontWeight: {
        normal: "500",
        bold: "700",
        black: "900",
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
  plugins: [],
} satisfies Config;
