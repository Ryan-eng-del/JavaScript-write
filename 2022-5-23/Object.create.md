## 手写 Object.create 方法

- 定义：在一个已经存在的对象的基础上创建另一个对象，使得创建的新对象可以访问已存在对象的 prototype。
  - 如果 proto 参数不是 null 或非原始包装对象，则抛出一个 TypeError 异常。
  - propertiesObject
    可选。需要传入一个对象，该对象的属性类型参照 Object.defineProperties()的第二个参数。如果该参数被指定且不为 undefined，该传入对象的自有可枚举属性(即其自身定义的属性，而不是其原型链上的枚举属性)将为新创建的对象添加指定的属性值和对应的属性描述符。

```javascript
const obj = { name: "kobe" };
const obj2 = { age: 15 };
/* 第二参数定义的是obj1自身的可枚举属性，而不是原型链上的属性 */
const obj1 = Object.create(
  { gender: "man", ...obj, ...obj2 },
  {
    gender: {
      value: "women",
      enumerable: true,
    },
    /* 默认属性描述符是不可遍历 enumerable: false*/
    name: {},
  }
);
for (let k in obj1) console.log(k, "key");
```

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
