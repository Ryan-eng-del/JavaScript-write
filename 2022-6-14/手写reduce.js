Array.prototype._reduce = function (fn, initialValue) {
  const _array = this;
  if (Object.prototype.toString.call(_array) !== "[object Array]") {
    throw new TypeError("reduce is a method of array");
  }
  if (Object.prototype.toString.call(fn) == "[Object function]") {
    throw new TypeError(`${fn} must be a function`);
  }
  /* 空数组的前提下就必须有初始值,没有初始值就报错 [].reduce(() => {}, 0) result:0 */
  if (_array.length === 0 && arguments.length === 1) {
    throw new TypeError("The array is not empty");
  }
  let accumulator = initialValue === undefined ? _array[0] : initialValue;
  const startPoint = initialValue === undefined ? 1 : 0;
  _array.slice(startPoint).forEach((item, index) => {
    accumulator = fn(accumulator, item, index + startPoint, _array);
  });
  return accumulator;
};
Array.prototype._reduce = function (fn, initialValue) {
  const _array = this;
  if (Object.prototype.toString.call(_array) !== "[object Array]") {
    throw new TypeError("reduce is a method of array");
  }
  if (Object.prototype.toString.call(fn) !== "[object Function]") {
    throw TypeError(`${fn} must be a function`);
  }
  /* 空数组的前提下就必须有初始值,没有初始值就报错 [].reduce(() => {}, 0) result:0 */
  if (_array.length === 0 && arguments.length === 1) {
    throw TypeError("The array is not empty");
  }
  let accumulator = initialValue === undefined ? _array[0] : initialValue;
  const startPoint = initialValue === undefined ? 1 : 0;

  for (let i = 0; i < _array.slice(startPoint).length; i++) {
    accumulator = fn(accumulator, _array[i + startPoint], i + startPoint, _array);
  }
  return accumulator;
};
const result = [].reduce((pre, cur, index, arr) => {
  console.log(pre, "pre");
  console.log(cur, "cur");
  console.log(index, "index");
  console.log(arr, "arr");
  return (pre += cur);
}, 0);
console.log(result);
