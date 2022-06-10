## 想法

> 为什么结果是间隔 3 秒打印 1， 又间隔 2 秒打印 2，最后间隔 1 秒打印 3。明明第一个延时器 setTimeout 的时间最长。

> 因为第一个延时器不 resolve，后面的 then 无法执行（阻塞），只有当第一个延时器 resove 了，后面的 then 执行，再顺序到第二个延时器的 resove……。

```javascript
const ajaxArray = [
  () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
        console.log(1);
      }, 3000);
    }),
  () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(2);
        console.log(2);
      }, 2000);
    }),
  () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(3);
        console.log(3);
      }, 1000);
    }),
];
function mergeArray(ajaxArray) {
  const results = [];
  return new Promise((resolve, reject) => {
    ajaxArray
      .reduce((pre, cur) => {
        return pre.then(cur).then((value) => {
          results.push(value);
        });
      }, Promise.resolve())
      .then(() => {
        resolve(results);
      });
  });
}
mergeArray(ajaxArray).then((res) => {
  console.log(res);
});
// 1
// 2
// 3
// [ 1, 2, 3 ]
```
