// 题目1
let obj = {
  num1: 117,
};
let res = obj;

/* 涨知识：获取属性优先级高于赋值运算符 */
/* 所以 最先执行的 obj.child 还是旧地址，res关联的是就地址，所以不会报错 */
obj.child = obj = {
  num2: 935,
};
var x = (y = res.child.num2);
console.log(obj.child); // undefined
console.log(res.num1); // 117
console.log(y); // 935

// 题目二
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function () {
  console.log("setTimeout");
}, 0);
async1();
new Promise((resolve) => {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

// 题目三
Promise.resolve().then(() => {
  console.log("第一个回调函数：微任务1");
  setTimeout(() => {
    console.log("第三个回调函数：宏任务2");
  }, 0);
});
setTimeout(() => {
  console.log("第二个回调函数：宏任务1");
  Promise.resolve().then(() => {
    console.log("第四个回调函数：微任务2");
  });
}, 0);
// 第一个回调函数：微任务1
// 第二个回调函数：宏任务1
// 第四个回调函数：微任务2
// 第三个回调函数：宏任务2

// 题目四
console.log("start");
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async2 end");
  await async3();
  console.log("async3 end");
}
function async2() {
  console.log("async");
}
function async3() {
  console.log("async3 start");
}
console.log("scrpit start");
setTimeout(() => {
  console.log("setTimeOut");
}, 0);
async1();
new Promise(function (reslove) {
  console.log("promise1");
  reslove("promise2");
}).then((res) => {
  console.log(res);
});
console.log("script end");
// start
// script start
// async1 start
// async
// promise1
// script end
// async2 end
// async3 start
// promise2
// async3 end
// setTimeout

// 题目五
let promiseFunc = function () {
  return new Promise((resolve, reject) => {
    console.log(this.name);
    setTimeout(function () {
      console.log(this.name);
      console.log("abc");
      resolve("cba");
    }, 2000);

    console.log("aaa");
  });
};

let Object1 = {
  name: "james",
  func: promiseFunc,
};

Object1.func().then((result) => {
  console.log("result", result);
});
// james
// 严格模式会报错，非严格模式下是空字符串
// "aaa"
// "abc"
// "result cba"

// 题目六
console.log("start here");
const foo = () => {
  return new Promise((resolve, reject) => {
    console.log("first promise constructor");
    let promise1 = new Promise((resolve, reject) => {
      console.log("second promise constructor");
      setTimeout(() => {
        console.log("setTimeout here");
        resolve();
      }, 0);

      resolve("promise1");
    });

    resolve("promise0");
    promise1.then((arg) => {
      console.log(arg);
    });
  });
};

foo().then((arg) => {
  console.log(arg);
});
console.log("end here");
// start here
// first promise constructor
// second promise constructor
// end here
// promise1
// promise0
// setTimeout here

// 题目七

console.log("Script开始");
setTimeout(() => {
  console.log("第一个回调函数，宏任务1");
  Promise.resolve().then(function () {
    console.log("第四个回调函数，微任务2");
  });
}, 0);
setTimeout(() => {
  console.log("第二个回调函数，宏任务2");
  Promise.resolve().then(function () {
    console.log("第五个回调函数，微任务3");
  });
}, 0);
Promise.resolve().then(function () {
  console.log("第三个回调函数，微任务1");
});
console.log("Script结束");
// Script开始
// Script结束
// 第三个回调函数，微任务1
// 第一个回调函数，宏任务1
// 第四个回调函数，微任务2
// 第二个回调函数，宏任务2
// 第五个回调函数，微任务3

// 题目八
console.log("Script开始");
setTimeout(() => {
  console.log("宏任务1（setTimeout)");
  Promise.resolve().then(() => {
    console.log("微任务promise2");
  });
}, 0);
setImmediate(() => {
  console.log("宏任务2");
});
setTimeout(() => {
  console.log("宏任务3（setTimeout)");
}, 0);
console.log("Script结束");
Promise.resolve().then(() => {
  console.log("微任务promise1");
});
process.nextTick(() => {
  console.log("微任务nextTick");
});
// Script 开始
// Script 结束
// 微任务nextTick
// 微任务promise1
// 宏任务2
// 宏任务1（setTimeout)
// 微任务promise2
// 宏任务3（setTimeout)

// 题目九
async function async1() {
  console.log("async1 start");
  await new Promise((resolve) => {
    console.log("promise1");
    resolve("promise1 resolve");
  }).then((res) => console.log(res));
  console.log("async1 success");
  return "async1 end";
}
console.log("srcipt start");
async1().then((res) => console.log(res));
console.log("srcipt end");

// script start
// async1 start
// promise1
// script end
// promise1 resolve
// async1 success
// async1 end

// Promise执行相关

// 题目一
Promise.reject("err!!!")
  .then(
    (res) => {
      console.log("success", res);
    },
    (err) => {
      console.log("error", err);
    }
  )
  .catch((err) => {
    console.log("catch", err);
  });
// error err!!!

// 题目二
Promise.resolve()
  .then(
    function success(res) {
      throw new Error("error!!!");
    },
    function fail1(err) {
      console.log("fail1", err);
    }
  )
  .catch(function fail2(err) {
    console.log("fail2", err);
  });
// fail2 [Error: error!!!]

// 题目三
Promise.resolve("1")
  .then((res) => {
    console.log(res);
  })
  .finally(() => {
    console.log("finally");
  });
Promise.resolve("2")
  .finally(() => {
    console.log("finally2");
    return "我是finally2返回的值";
  })
  .then((res) => {
    console.log("finally2后面的then函数", res);
  });
// 1
// finally2
// finally
// finally2后面的then函数 我是finally2返回的值

// 题目四
function promise1() {
  let p = new Promise((resolve) => {
    console.log("promise1");
    resolve("1");
  });
  return p;
}
function promise2() {
  return new Promise((resolve, reject) => {
    reject("error");
  });
}
promise1()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => console.log("finally1"));

promise2()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => console.log("finally2"));
// promise1
// 1
// err
// finally1
// finally2

// 题目六
async function async1() {
  try {
    await Promise.reject("error!!!");
  } catch (e) {
    console.log(e);
  }
  console.log("async1");
  return Promise.resolve("async1 success");
}
async1().then((res) => console.log(res));
console.log("script start");
// script start
// error!!!
// async1
// async1 success

// 题目七
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("resolve2");
    console.log("timer1");
  }, 0);
  resolve("resolve1");
  resolve("resolve2");
})
  .then((res) => {
    console.log(res);
    setTimeout(() => {
      console.log(p1);
    }, 1000);
  })
  .finally((res) => {
    console.log("finally", res);
  });
// resolve1
// finally undefined
// timer
//Prmoise {<fulfilled:undefined>}
