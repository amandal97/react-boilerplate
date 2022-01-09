const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map", // source mapping for debugging purposes
  devServer: {
    // folder from which index.html will be served
    static: "./dist",
    // mention port no. Default is 3000
    port: 8080,
    client: {
      // Shows error and warning messages on top of screen
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    // enables gzip compression
    compress: true,
    // Tells dev-server to open the browser after server had been started
    open: true,
  },
  // Output point is where webpack should
  // output the bundles and assets
  output: {
    // path where the bundled files will be stored
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js", // this file will be generated after build
    chunkFilename: "[name].chunk.js", // chunk file for dynamic imports

    // Webpack has the ability to generate path info in the output bundle.
    // However, this puts garbagecollection pressure on projects that bundle thousands of modules.
    pathinfo: false,
  },

  // Removing all algorithmic processes for development mode
  optimization: {
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
});
