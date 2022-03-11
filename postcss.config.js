module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      stage: 1,
    }),
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
  ],
};