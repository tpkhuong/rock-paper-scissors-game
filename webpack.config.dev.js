const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");

module.exports = merge(commonConfig, {
  mode: "development",
  module: {
    rules: [
      {
        test: /.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-bundle.[contenthash].js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
});
