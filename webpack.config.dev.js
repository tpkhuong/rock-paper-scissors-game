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
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
});
