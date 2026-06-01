import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        ig: {
          border: "#dbdbdb",
          text: "#262626",
          secondary: "#8e8e8e",
          link: "#00376b",
          blue: "#0095f6",
          bg: "#fafafa",
        },
      },
      aspectRatio: {
        "1/1": "1 / 1",
      },
    },
  },
  plugins: [],
};

export default config;
