## Object.assign(target, ...source)

- `Object.assign` 用于对象的浅拷贝，将一个或者多个源对象的自身可枚举属性`（Object.hasOwnProperty()返回 true） -> （不复制源对象原型链上的数据）`复制到目标对象当中去。

```javascript
function _assign(target, ...resources) {
  if (target === null || target === undefined) {
    throw new TypeError("can not convert null or undefined to object");
  }
  const obj = Object(target);
  resources.forEach((resource) => {
    if (resource) {
      for (const k in resource) {
        if (Object.prototype.hasOwnProperty.call(resource, k)) {
          obj[k] = resource[k];
        }
      }
    }
  });
  return obj;
}
```
