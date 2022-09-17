const arr = [1, 3, 5, 2, 4]
// filter每次会迭代数组元素，当返回false时会过滤掉此次迭代
const arr2 = arr.filter((item) => item > 3)
console.log(arr2)

const arr3 = arr.map((item) => item * 3)
console.log(arr3)

// reduce((前一个值，当前迭代的值))
const sum = arr.reduce((preValue, item) => preValue + item, 0)
console.log(sum)

const S = arr
  .filter((item) => item > 3)
  .map((item) => item * 3)
  .reduce((preValue, item) => preValue + item, 0)
//15+12=27
console.log(S);

// export default {
//   arr
// }