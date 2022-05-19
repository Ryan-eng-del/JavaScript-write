# 书写 bind - new

## 思路

- bind 参数：第一个参数绑定 this，第二个参数传入展开数组，作为函数参数。
- bind 返回值：返回一个绑定函数，该函数如果普通调用指向 bind 的第一个参数，如果通过 new 调用，this 指向构造实例（构造实例的原型链上有调用 bind 构造函数的原型）被忽略，参数仍然有效。

## 代码

```javascript
Function.prototype.bindTwo = function (context) {
  if (typeof this !== "function") {
    throw new Error("bind是供函数消费的方法");
  }
  const self = this;
  /* 调用bind时传入的参数 */
  const firstArg = Array.prototype.slice.call(arguments, 1);
  function fCenter() {}
  function fbound() {
    /* 调用返回的绑定函数时传递的参数 */
    const args = Array.prototype.slice.call(arguments);
    /* 判断普通调用和new调用 */
    self.apply(this instanceof self ? this : context, firstArg.concat(args));
  }
  /* 目的是当new调用的时候，实例的原型链上有调用bind方法的函数的原型对象 */
  fCenter.prototype = this.prototype;
  /* 借用构造函数实现继承 */
  fbound.prototype = new fCenter();
  return fbound;
};

/* 测试用例 */
var value = 2;

var foo = {
  value: 1,
};

function bar(name, age) {
  this.habit = "shopping";
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = "kevin";

var bindFoo = bar.bind(foo, "daisy");

var obj = new bindFoo("18");
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```

## 思路

- new 一个函数，发生了什么？
  - 创建一个新对象，并且将函数中的 this 指向该构造函数的原型。
  - 执行构造函数。
  - 判断构造函数当中是否返回对象，如果没有，则返回新对象，如果有返回该对象。

## 代码

```javascript
function objectFactory() {
  var object = new Object();
  var Constructor = Array.prototype.shift.call(arguments);
  /* 原型式继承 */
  object.__proto__ = Constructor.prototype;
  /* arguments第一个已经被shift，此时arguments正是我们想要的参数 */
  var result = Constructor.apply(object, arguments);
  return typeof result === "object" ? result : object;
}
/* 测试用例 */
function Otaku(name, age) {
  this.name = name;
  this.age = age;

  this.habit = "Games";
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
  console.log("I am " + this.name);
};

var person = objectFactory(Otaku, "Kevin", "18");

console.log(person.name); // Kevin
console.log(person.habit); // Games
console.log(person.strength); // 60

person.sayYourName(); // I am Kevin
```

## 测试通过，恭喜我自己

## 参考

https://juejin.cn/post/6844903476766441479#heading-2
https://juejin.cn/post/6844903476623835149
