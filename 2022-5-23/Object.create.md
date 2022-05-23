## 手写 Object.create 方法

- 定义：在一个已经存在的对象的基础上创建另一个对象，使得创建的新对象可以访问已存在对象的 prototype。
  - 如果 proto 参数不是 null 或非原始包装对象，则抛出一个 TypeError 异常。
  - propertiesObject
    第二参数可选。需要传入一个对象，该对象的属性类型参照 Object.defineProperties()的第二个参数。

```javascript
function _create(proto, prpertiesObject) {
  if (typeof proto !== "object" && proto !== null) throw new TypeError("proto must be an object or null");

  function Fn() {}
  Fn.prototype = proto;
  const obj = new Fn();
  if (prpertiesObject) Object.defineProperties(obj, prpertiesObject);
  return obj;
}
```
