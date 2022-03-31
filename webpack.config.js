const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ["./src/index.ts"],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: "main.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
          {from: 'assets', to: 'assets'}
      ]
    }),
  ],
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  // mode: "production",
  mode: "development",
  devtool: 'source-map',
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: "ts-loader",
      },{
        test: /\.(jpe?g|png|gif|svg|tga|glb|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg)$/i,
        use: 'file-loader',
        exclude: path.resolve(__dirname, './node_modules/')
      }
    ],
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    static: "dist",
    open: true
  }
};
