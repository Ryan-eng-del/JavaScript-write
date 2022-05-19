## 谢谢抱枕姐姐整理了题目！

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

## 第六题

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
