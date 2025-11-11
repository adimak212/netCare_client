import { Config } from "tailwindcss";

export default {
    content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: {
      colors:{
        primary:"#1173d4",
        background:"#102235"
      }
    },
  },
  plugins: [],
} satisfies Config

