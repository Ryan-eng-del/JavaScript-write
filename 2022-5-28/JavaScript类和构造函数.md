---
title: JavaScript - 类
author: 书笙
date: "2021-7-7"
---

## Class

- `javascript 类`其实是构造函数和原型的语法糖。
- 从 constructor -> 实例属性 -> 原型方法 -> 静态方法和静态属性 -> getter, settter -> extends(继承组合式继承)来叙述类和 ES5 的对应。

## 类的基本使用与 ES5 构造函数的对应

```javascript
class Person {
  // 静态属性
  static _address = "earth";
  // 构造器只允许有一个，你不写，js调用默认的构造器。
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  // 原型方法
  eating() {
    console.log(this.name + "is eating");
  }
  saying() {
    console.log(this.name + "is saying");
  } //静态方法
  static fun() {
    console.log("perosn is fun");
  }
  // 箭头函数声明的方法不能使用super关键字。
  getName = () => {};
  // 属性访问器
  get age() {}
  set age(value) {}
}
const p = new Person("clc", 18);
p.eating(), p.saying();
Person.fun();
console.log(Person._address);
console.log(p.age);

/* ES6类对应的 ES5代码 */
function Person() {
  /* constructor */
  /* 实例属性 */
  this.name = name;
  this.age = age;
}
/* getter setter */
Person.prototype = {
  get name() {}
  set name(newName) {}
}
/* 原型方法 */
Person.prototype.eating = function () {};
Person.prototype.saying = function () {};
/* 静态方法和静态属性 */
Person.fun = function () {};
Person._adress = "earth";
```

## 类的继承

https://es6.ruanyifeng.com/#docs/class-extends

```javascript
class Student extends Person {
  /* super作为函数调用时，代表父类的构造函数。 */
  constructor(name, age, sex) {
    super(name, age);
    this.sex = sex;
  }
  /* super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。 */
  // 父类方法的重载
  eating() {
    /* super虽然指向父类的原型对象，但是调用父类原型对象上的方法是通过super.eating.call(this)来调用的，也就是通过这种方法调用的时候，父类方法中的this指向子类的实例对象 */
    super.eating();
    console.log("在原有的基础上子类拓展逻辑");
  }
  // 静态方法的重载
  static fun() {
    super.fun();
    console.log("在原有的基础上子类拓展逻辑");
  }
}
//继承父类原型方法的同时子类会继承父的类方法。
const stu1 = new Student("ryan", 18, "man");
stu1.eating();
```

## Babel 对类的编译

- `Babel` 编译无继承的类代码的情况是：`_createClass函数当中`通过 `Object.defineProperty` 来定义构造函数和构造函数的原型对象，定义构造函数的目的是定义静态属性和方法，定义构造函数的原型对象的目的是定义原型方法（注意在类当中原型方法不可遍历，并且原型对象不可以改写，因为：`eumerable: false， writable: false`）。 定义原型方法的时候，通过判断属性描述符当中是否有 value 来判断是否是 `getter, setter`语法。
- `Babel` 编译有继承的类代码的情况是：在无继承的代码上，增加了 `createSuper` 函数，该函数返回 `super` 函数，之后调用 `super` 函数在 `super` 函数当中通过 `Reflect.constructor()`来创建子类的实例对象，以此来实现继承父类构造函数的实例属性，通过寄生组合式继承来实现父类原型方法的继承，通过关联子类和父类构造函数的`__proto__`这条隐式原型路线来实现静态方法的继承。

- `Reflect.construct(Super, arguments, NewTarget);`
  - 通过调用父类的构造函数来创建实例对象, 但是这个实例对象的**proto**指向的原型对象的 `constructor` 指向的是子类的构造函数（实际效果就好像是将父类构造函数的构造属性放到子类当中然后 new 子类创建了子类实例）。

### ES6

```javascript
class Person {
  static _address = "earth";
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  eating() {
    console.log(this.name + "is eating");
  }
  static fun() {
    console.log("perosn is fun");
  }
}
```

### ES5

```javascript
"use strict";

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _defineProperties(target, props) {
  // 遍历方法数组，通过Object.defineProperty给原型对象和构造函数添加方法。
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
// 为构造函数添加静态属性
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}

var Person = /*#__PURE__*/ (function () {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  _createClass(
    Person,
    [
      {
        key: "eating",
        value: function eating() {
          console.log(this.name + "is eating");
        },
      },
    ],
    [
      {
        key: "fun",
        value: function fun() {
          console.log("perosn is fun");
        },
      },
    ]
  );

  return Person;
})();

_defineProperty(Person, "_address", "earth");
```

## 类转 ES5 代码(继承）

### ES6

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  running() {
    console.log(this.name + " running~");
  }

  static staticMethod() {}
}

class Student extends Person {
  constructor(name, age, sno) {
    super(name, age);
    this.sno = sno;
  }

  studying() {
    console.log(this.name + " studying~");
  }
}
```

### ES5

```javascript
"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  // 目的静态方法的继承
  // Student.__proto__ = Person
  if (superClass) _setPrototypeOf(subClass, superClass);
}

// o: Student
// p: Person
// 静态方法的继承
function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Person = /*#__PURE__*/ (function () {
  function Person(name, age) {
    _classCallCheck(this, Person);
    this.name = name;
    this.age = age;
  }

  _createClass(Person, [
    {
      key: "running",
      value: function running() {
        console.log(this.name + " running~");
      },
    },
  ]);

  return Person;
})();

var Student = /*#__PURE__*/ (function (_Person) {
  // 实现之前的寄生式继承的方法(静态方法的继承)
  _inherits(Student, _Person);

  var _super = _createSuper(Student);

  function Student(name, age, sno) {
    var _this;

    _classCallCheck(this, Student);

    // Person不能被当成一个函数去调用
    // Person.call(this, name, age)

    debugger;
    // 创建出来的对象 {name: , age: }
    _this = _super.call(this, name, age);
    _this.sno = sno;
    // {name: , age:, sno: }
    return _this;
  }

  _createClass(Student, [
    {
      key: "studying",
      value: function studying() {
        console.log(this.name + " studying~");
      },
    },
  ]);

  return Student;
})(Person);

var stu = new Student();
```
