// 基本配置
const webpack = require('webpack'); //webpack本身

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin'); //html打包

const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin'); //代码丑化，即压缩

module.exports = {
  // 入口
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    // publicPath: 'dist/'
  },
  module: {
    rules: [{
        test: /\.css$/,
        // 使用多个loader时，webpack是从右向左加载的
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      }
    ]
  },
  resolve: {
    //省略文件后缀
    extensions: ['.js', '.css', '.vue'],
    alias: {
      //可以编译template
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.BannerPlugin('最终版权归Turnip所有'),
    // 复制html模版
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),

  ],
}