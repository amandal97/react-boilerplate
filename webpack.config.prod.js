const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config.base");

module.exports = merge(baseConfig, {
  mode: "production",
  // Output point is where webpack should
  // output the bundles and assets
  output: {
    // path where the bundled files will be stored
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[contenthash].js", // this file will be generated after build
    chunkFilename: "[name].[contenthash].chunk.js", // chunk file for dynamic imports

    // cleans the output directory, removing files that are not required
    clean: true,
  },
  optimization: {
    // despite any new local dependencies,
    // vendor hash (chunk file where node_modules dependencies are present)
    // will stay consistent between builds
    moduleIds: "deterministic",

    // runtime code in a separate file
    runtimeChunk: true,

    // for use in production mode
    // vendor file for node_modules dependencies that will not change frequently
    // Decreases the build size
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
});
