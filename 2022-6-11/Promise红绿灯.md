## Promise

```javascript
function timeout(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
function light(lightArr) {
  lightArr
    .reduce((pre, cur) => {
      return pre.then(cur).then((color) => console.log(color));
    }, Promise.resolve())
    .then(() => light(lightArr));
}
light([
  () => timeout(3000).then(() => "红色"),
  () => timeout(2000).then(() => "黄色"),
  () => timeout(1000).then(() => "绿色"),
]);
```

## Async/Await

```javascript
function timeoutAwait(color, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(color, "async");
      resolve();
    }, delay);
  });
}
async function lightAwait() {
  while (true) {
    await timeoutAwait("红色", 3000);
    await timeoutAwait("黄色", 2000);
    await timeoutAwait("绿色", 1000);
  }
}
lightAwait();
```
