## 第 9 题

- 按照显示原型路线和隐式原型路线来解题。

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
```

## 第 7 题

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

person1.obj.foo1()();
person1.obj.foo1.call(person2)();
person1.obj.foo1().call(person2);

person1.obj.foo2()();
person1.obj.foo2.call(person2)();
person1.obj.foo2().call(person2);
```

## 第六题

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

person1.foo1();
person1.foo1.call(person2);

person1.foo2();
person1.foo2.call(person2);

person1.foo3()();
person1.foo3.call(person2)();
person1.foo3().call(person2);

person1.foo4()();
person1.foo4.call(person2)();
person1.foo4().call(person2);

var obj = {
  name: "obj",
  foo: function () {},
};
```
