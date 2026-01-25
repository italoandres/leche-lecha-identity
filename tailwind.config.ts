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
        background: "#1a1f2e",
        foreground: "#e8eaed",
        primary: "#4a90e2",
        secondary: "#2c3e50",
        accent: "#5dade2",
        muted: "#7f8c8d",
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro', 'Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
