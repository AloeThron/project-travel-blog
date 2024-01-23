import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '346.8 77.2% 49.8%',
        secondary: '240 4.8% 95.9%',
        tertiary: '#403d39',
        light: '#fffcf2',
      },
    },
  },
  plugins: [],
};
export default config;
