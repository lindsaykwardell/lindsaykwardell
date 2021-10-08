module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{astro,js,jsx,ts,tsx,vue}"],
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lindsay: "rgb(112,36,89)",
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: "white",
            strong: {
              color: "white",
            },
            a: {
              color: "white",
              "&:hover": {
                color: "white",
              },
            },
            blockquote: {
              color: "white",
            },
            code: {
              color: "white",
            },
            h1: {
              color: "white",
            },
            h2: {
              color: "white",
            },
            h3: {
              color: "white",
            },
            h4: {
              color: "white",
            },
            h5: {
              color: "white",
            },
            h6: {
              color: "white",
            }
          },
        },
      }),
    },
  },
  variants: {
    typography: ["dark"],
  },
};
