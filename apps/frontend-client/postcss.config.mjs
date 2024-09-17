/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
  env: {
    BASE_URL_AUTH: process.env.BASE_URL_AUTH,
  },
};

export default config;
