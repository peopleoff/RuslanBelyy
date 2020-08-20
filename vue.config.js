const CopyWebpackPlugin = require("copy-webpack-plugin");

const Path = require("path");

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: Path.resolve(__dirname, "./public"), to: "public" },
          {
            from: "node_modules/deviceful/public",
            to: "public",
          },
        ],
      }),
    ],
  },
};
