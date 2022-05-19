## 实现 sum 函数

- sum(1, 2, 3).valueOf() // 6
- sum(2, 3)(2).valueOf() // 7
- sum(1)(2)(3)(4).valueOf() // 10
- sum(2)(4, 1)(2).valueOf() // 9

```javascript
function sum() {
  let args = [...arguments];
  function innerSum() {
    args.push(...arguments);
    return innerSum;
  }
  innerSum.valueOf = () => args.reduce((pre, cur) => pre + cur);
  return innerSum;
}
```
