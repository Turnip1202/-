// 开发配置
const webpackMerge = require('webpack-merge'); //配置合并
const baseConfig = require('./base.config');


module.exports = webpackMerge.merge(baseConfig, {
  devServer: {
    contentBase: './dist',
    inline: true,
    port: 3000
  }
})