const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const rimraf = require("rimraf");
const srcDir = path.join(__dirname, "..", "src");
module.exports = {
  entry: {
    background: path.join(srcDir, 'background.ts'),
    content_script: path.join(srcDir, 'content_script.ts'),
  },
  output: {
    path: path.join(__dirname, `../dist/${process.env.MANIFEST_VERSION}`),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {from: ".", to: ".", context: "public"},
        {from: `./manifest_${process.env.MANIFEST_VERSION}.json`, to: "./manifest.json", context: "manifest"}
      ],
      options: {},
    }),
    // MANIFEST_VERSION can be v2 or v3 at build time
    new webpack.EnvironmentPlugin(['MANIFEST_VERSION']),
  ],
};
