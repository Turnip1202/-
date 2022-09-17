const webpack = require('webpack');

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');

const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
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
        test: /\.(png|jpg|gif)$/, //匹配png/jpg/gif格式图片
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192, //图片小于8KB时候将图片转成base64字符串，大于8KB需要使用file-loader
            name: 'img/[name].[hash:8].[ext]' //img表示文件父目录，[name]表示文件名,[hash:8]表示将hash截取8位[ext]表示后缀
          }
        }]
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
    // 代码丑化
    // new UglifyjsWebpackPlugin()
  ],
  devServer: {
    contentBase: './dist',
    inline: true,
    port: 3000
  }
}