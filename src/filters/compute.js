// 四则运算(解决了精度丢失的问题)
import NP from 'number-precision';
export default [
  {
    name: 'plus',
    func: NP.plus
  },
  {
    name: 'minus',
    func: NP.minus
  },
  {
    name: 'times',
    func: NP.times
  },
  {
    name: 'divide',
    func: NP.divide
  }
];

// 用法：
// $filters.plus(0.1, 0.2)
// = 0.3 (not 0.30000000000000004)

// $filters.minus(1.0, 0.9)
// = 0.1 (not 0.09999999999999998)

// $filters.times(3, 0.3)
// = 0.9 (not 0.8999999999999999)

// $filters.divide(1.21, 1.1)
// = 1.1 (not 1.0999999999999999)
