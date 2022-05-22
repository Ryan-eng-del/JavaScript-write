## 手写 instanceof

```javascript
function Instanceof(instance, constructFn) {
  if (typeof constructFn !== "function" || typeof instance !== "object" || instance === null) return false;
  let cur = instance.__proto__;
  /* let cur = Object.getPrototypeof(instance) */
  while (true) {
    if (cur === null) return false;
    if (cur === constructFn.prototype) return true;
    cur = cur.__proto__;
    /*  cur = Object.getPrototypeOf(cur); */
  }
}
```
