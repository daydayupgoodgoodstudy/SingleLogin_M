const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: "development",
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      //jsx装载器
      {
        test: /\.jsx|js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', //模板路径
      // hash: true,
      minify: {
        removeAttributeQuotes: true // 移除属性的引号
      },
      inject: true
    }),
    new webpack.ProvidePlugin({
      'axios': 'axios'
    }),
  ]

};