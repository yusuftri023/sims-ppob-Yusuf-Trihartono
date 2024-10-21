/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: { poppins: ["Poppins"] },
    extend: {
      keyframes: {
        growWidth: {
          "0%": { width: 0 },
          "100%": { width: "100%" },
        },
        fadeInToBottom: {
          "0%": { opacity: 0, transform: "translateY(-25px)" },
          "100%": { opacity: 100, transform: "translateY(0)" },
        },
        fadeOutToTop: {
          "0%": { opacity: 100, transform: "translateY(0)" },
          "100%": {
            opacity: 0,
            transform: "translateY(-25px)",
          },
        },
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        underlineFadein: {
          "0%": { "border-bottom-color": 0 },
          "100%": { "border-bottom-opacity": 100 },
        },
        shine: {
          "0%": { "background-position": "-100% 0,0 0" },
          "100%": { "background-position": "200% 0,0 0" },
        },
      },
      animation: {
        "grow-width": "growWidth 5s linear",
        "fade-in-drop": "fadeInToBottom 0.4s linear",
        slide: "slide 30s infinite linear",
        shining: "shine 1s linear infinite",
        "underline-fade-in": "underlineFadein 0.2s linear",
      },
    },
  },
  plugins: [],
};
