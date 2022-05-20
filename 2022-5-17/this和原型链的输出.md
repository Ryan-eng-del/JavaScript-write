## 第 10 题

```javascript
function Fn() {
  this.name = "xiaoming";
  this.age = "12";
}

function Fn1() {
  this.age = 18;
}

Fn.prototype.getName = function () {
  console.log(this.name);
};

Object.prototype.getAge = function () {
  console.log(this.age);
};
let f1 = new Fn();
// "xiao ming" 如果 Fn 换成 Function ----> f1.getName is not a function
f1.getName();
// "12"
f1.getAge();
let f2 = new Fn1();
f2.getAge();
// 18
```

## 第 9 题

- https://juejin.cn/post/7078270231797301285

- 按照显式原型路线和隐式原型路线来解题。

```javascript
Function.prototype.a = function () {
  console.log("我是 a");
};
Object.prototype.b = function () {
  console.log("我是 b");
};

function A() {}
var c = new A();

A.a(); // i am a
A.b(); // i am b
c.a(); // c.a is not a function
c.b(); // i am b
Function.b(); // i am b
Object.a(); // i am a
```

## 第 8 题

- <阮一峰 ES6>
  - 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

```javascript
var x = 0;

function foo(
  x,
  y = function () {
    x = 3;
    console.log(x);
  }
) {
  console.log(x);
  var x = 2;
  console.log(x);
  y();
  console.log(x);
}

foo(1);
console.log(x);
// 1
// 2
// 3
// 2
// 0
```

## 第 7 题

- 《你不知道的 JavaScript 上卷：this 的绑定规则》+ `coderwhy JavaScript 高级课程` 中的 this 一节。
- 箭头函数不绑定 this，箭头函数中的 this 指向其定义位置向外一层的函数或者全局作用域中的 this。
- 非严格模式下，全局函数中的`普通调用` this 指向 window，严格模式下指向 `undefined`。

```javascript
var name = "window";

function Person(name) {
  this.name = name;
  this.obj = {
    name: "obj",
    foo1: function () {
      return function () {
        console.log(this.name);
      };
    },
    foo2: function () {
      return () => {
        console.log(this.name);
      };
    },
  };
}

var person1 = new Person("person1");
var person2 = new Person("person2");

person1.obj.foo1()(); // window
person1.obj.foo1.call(person2)(); // window
person1.obj.foo1().call(person2); // person2

person1.obj.foo2()(); // obj
person1.obj.foo2.call(person2)(); // person2
person1.obj.foo2().call(person2); // obj
```

## 第 6 题

- 《你不知道的 JavaScript 上卷：this 的绑定规则》+ `coderwhy JavaScript 高级课程` 中的 this 一节。
- 箭头函数不绑定 this，箭头函数中的 this 指向其定义位置向外一层的函数或者全局作用域中的 this。
- 非严格模式下，全局函数中的`普通调用` this 指向 window，严格模式下指向 `undefined`。

```javascript
var name = "window";

function Person(name) {
  this.name = name;
  this.foo1 = function () {
    console.log(this.name);
  };
  this.foo2 = () => console.log(this.name);
  this.foo3 = function () {
    return function () {
      console.log(this.name);
    };
  };
  this.foo4 = function () {
    return () => {
      console.log(this.name);
    };
  };
}

var person1 = new Person("person1");
var person2 = new Person("person2");

person1.foo1(); // person1
person1.foo1.call(person2); // person2

person1.foo2(); // person1
person1.foo2.call(person2); // person1

person1.foo3()(); // window
person1.foo3.call(person2)(); // window
person1.foo3().call(person2); // person2

person1.foo4()(); // person1
person1.foo4.call(person2)(); // person2
person1.foo4().call(person2); // person1
```

## 第 5 题

```javascript
var name = "window";

var person1 = {
  name: "person1",
  foo1: function () {
    console.log(this.name);
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name);
    };
  },
  foo4: function () {
    return () => {
      console.log(this.name);
    };
  },
};

var person2 = { name: "person2" };

person1.foo1(); // perons1
person1.foo1.call(person2); // person2

person1.foo2(); // window
person1.foo2.call(person2); // window

person1.foo3()(); // window
person1.foo3.call(person2)(); // window
person1.foo3().call(person2); // person2

person1.foo4()(); // person1
person1.foo4.call(person2)(); // person2
person1.foo4().call(person2); // person1
```

## 第 4 题

```javascript
var name = "window";

var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  },
};

function sayName() {
  var sss = person.sayName;
  sss();
  person.sayName();
  person.sayName();
  (b = person.sayName)();
}

sayName();
// window
// person
// person
// window
```

## 第 3 题

- 《你不知道的 JavaScript 上》
  1. 由 new 调用？绑定到新创建的对象。
  2. 由 call 或者 apply（或者 bind）调用？绑定到指定的对象。
  3. 由上下文对象调用？绑定到那个上下文对象。
  4. 默认：在严格模式下绑定到 undefined，否则绑定到全局对象。
- new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定（区分严格模式，非严格模式）。

```javascript
function foo(something) {
  this.a = something;
}

var obj1 = {
  foo: foo,
};

var obj2 = {};

obj1.foo(2);
console.log(obj1.a);
obj1.foo.call(obj2, 3);
console.log(obj2.a);
var bar = new obj1.foo(4);
console.log(obj1.a);
console.log(bar.a);
// 2
// 3
// 2
// 4
```

## 第 2 题

```javascript
window.number = 2;
var obj = {
  number: 3,
  db1: (function () {
    console.log(this, "IIFE");
    this.number *= 4;
    return function () {
      console.log(this);
      this.number *= 5;
    };
  })(),
};
var db1 = obj.db1;
db1();
obj.db1();
console.log(obj.number);
console.log(window.number);
// window - IIFE
// window
// obj1:{number: 3, db1: f}
// 15
// 40
```

## 第 1 题

- MDN:
  - call 的第一个参数：可选的。在 `function` 函数运行时使用的 this 值。请注意，this 可能不是该方法看到的实际值：如果这个函数处于非严格模式`(严格模式下不传，指向 undefined)`下，则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。

```javascript
var length = 10;
function fn() {
  return this.length + 1;
}
var obj = {
  length: 5,
  test1: function () {
    return fn();
  },
};
obj.test2 = fn;

console.log(obj.test1.call());
console.log(obj.test1());
console.log(obj.test2.call());
console.log(obj.test2());
// 11
// 11
// 11
// 6
```
