const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Entry point that indicates where
  // should the webpack start bundling
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // checks for .js or .jsx files
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true, // caching mechanism, build time decreases with every build
          presets: ["@babel/env"],
        },
      },
      {
        test: /\.css$/, // checks for .css files
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Basic Boilerplate of React", // this is required for generating index.html in /dist
      template: "./public/index.html", // Uses the mentioned html file as a template
    }),
  ],
  // Options for resolving module requests
  // extensions that are used
  resolve: { extensions: ["*", ".js", ".jsx"] },
};
