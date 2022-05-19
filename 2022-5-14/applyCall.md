# 书写 apply - call

## 思路：

- call 参数：第一个参数是 this 指向，其他参数传递给函数。
- call 作用：调用绑定函数，改变函数当中 this 指向(对象方法中的 this 指向该对象的，所以可以讲该函数作为方法添加到该对象当中去，就可以指向该对象)。

## 代码

```javascript
Function.prototype.callTwo = function (context) {
  /* 绑定null的时候指向window */
  context = context || window;
  context.fn = this;
  var args = [];
  /* 从1开始去取不包括第一个参数的其他函数参数 */
  for (let i = 1; i < arguments.length; i++) {
    args.push("arguments[" + i + "]");
  }
  console.log(args);
  /* args会调用数组的toString方法变为 arguments[1] arguments[2] argument[3] */
  var result = eval("context.fn( " + args + ")");
  /* eval作用域中的代码  context.fn(arguments[0],arguments[1]) */
  delete context.fn;
  return result;
};

/* 测试用例 */
var foo = {
  value: 1,
};

function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}

bar.callTwo(foo, "kevin", 18);
```

## 思路

- apply 参数：第一个参数是 this 指向，第二个参数是数组，数组当中共的元素是函数参数。
- apply 作用：调用函数，改变 this 指向(对象方法中的 this 指向该对象的，所以可以讲该函数作为方法添加到该对象当中去，就可以指向该对象)。

## 代码

```javascript
Function.prototype.applyTwo = function (context, arr) {
  context = context || window;
  context.fn = this;
  var result;
  var args = [];
  if (!arr) {
    result = context.fn();
  } else {
    for (let i = 0; i < arr.length; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args + ")");
    /* eval作用域中的代码  context.fn(arr[0],arr[1]) */
  }
  delete context.fn;
  return result;
};
var foo = {
  value: 1,
};

function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}

bar.applyTwo(foo, ["kevin", 18]);
```

## 测试通过，恭喜我自己!

## 参考

https://juejin.cn/post/6844903476477034510#heading-3
