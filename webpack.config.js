module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "main.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
