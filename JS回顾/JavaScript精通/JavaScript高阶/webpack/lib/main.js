"use strict";

var _test = require("./js/test");

var _index = _interopRequireDefault(require("./css/index.css"));

var _main = _interopRequireDefault(require("./css/main.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(_test.obj);
setTimeout(function () {
  console.log('计时器');
}, 1000);
document.writeln('<h2>萝卜</h2>');