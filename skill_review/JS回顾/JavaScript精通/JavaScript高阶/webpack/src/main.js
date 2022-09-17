import {
  turnip
} from './js/test';
console.log(turnip)

import css from './css/index.css';
import less from './css/main.less'

document.writeln('<h2>萝卜turnip</h2>')

// 导入Vue
import Vue from 'vue';
// 设置组件
// import App from './vue/vue.js'
import App from './vue/turnip'
new Vue({
  el: '#app',
  // 当template和el同时存在，则template会直接替换el的位置
  template: '<App></App>',
  components: {
    App
  }

})