import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
      },
      animation: {
        "tracking-in-expand": "tracking-in-expand 3s cubic-bezier(0.215, 0.610, 0.355, 1.000) both",        //タイトルのアニメーション
        'slide-in-left': 'slideInLeft 1.5s ease-out forwards',                                              //Sectionのアニメーション
        "slide-in-fwd-center": "slide-in-fwd-center 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
      },
      keyframes: {
        "tracking-in-expand": {
          "0%": {
            "letter-spacing": "-.5em",
            opacity: "0"
          },
          "40%": {
            opacity: ".6"
          },
          "100%": {
            opacity: "1"
          }
        },
        slideInLeft: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: "0",
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: "1",
          },
        },
        "slide-in-fwd-center": {
          "0%": {
            transform: "translateZ(-1400px)",
            opacity: "0"
          },
          to: {
            transform: "translateZ(0)",
            opacity: "1"
          }
        }
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
};

export default config;