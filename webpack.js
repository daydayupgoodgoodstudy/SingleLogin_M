const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: ['babel-polyfill', './src/index.jsx'],
  output: {
    path: path.join(__dirname, "./dist"),
    filename: 'bundle.[chunkhash:8].js',
    publicPath: '/',
    chunkFilename: 'chunkRoute/[name].[chunkhash:8].chunk.js'
  },
  devServer: {
    // historyApiFallback: true,
    // progress: false,
    // contentBase: './app',
    host: "localhost",
    port: 8080,
    proxy: {
      '/api/*': {
        //localhost:3000是接口地址
        // target: "http://119.29.223.81:3000/",
        target:"http://172.17.3.170:48081/",
        // target: 'http://localhost:3000/',
        changeOrigin: true,
      }
    }
  },
  module: {
    rules: [
      //jsx|js装载器
      {
        test: /\.jsx|js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        // 图片加载器
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'url-loader?limit=5000'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'//添加对样式表的处理
      },
      //sass编译
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
          options: {} // style-loader options
        }, {
          loader: 'css-loader',
          options: {
            // modules:true, //开启css Modules模式
            importLoaders: 1 // css-loader options
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
            }
          }
        },
        { loader: 'sass-loader', options: { sourceMap: true } }]
      },
      //icon图片
      {
        test:/\.(woff|svg|eot|ttf)\??.*$/,
        loader:"url-loader?name=fonts/[name].[md5:hash:hex:5].[ext]",
      }
    ]
  },
  resolve: {
    extensions: ['.css', '.js', '.jsx','json','.scss'],
    alias: {
      "@": path.join(__dirname, 'src'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', //模板路径
      hash: true,
      minify: {
        removeAttributeQuotes: true // 移除属性的引号
      },
      inject: true
    }),
    new webpack.ProvidePlugin({
      "React": "react",
      'axios': 'axios'
    }),
    // new CleanWebpackPlugin(
    //   [
    //     'dist/bundle.*',
    //     'dist/index.html',
    //     'dist/chunkRoute/*'
    //   ], {
    //     root: __dirname,
    //     verbose: true,
    //     dry: false,
    //   }),
  ]
};