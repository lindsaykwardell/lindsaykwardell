const postcssNested = require("postcss-nested");

module.exports = {
  plugins: [postcssNested(), tailwindcss: {}, autoprefixer: {}],
};
