## Promise

### 一

- 异步的 Promise 是一个有三种状态的对象，pending（待定）, fufilled（兑现）, rejected（拒绝）。
- 无论落定为哪种状态都是不可逆的。
- Promise 的状态转换为兑现，就会有一个兑现的值 value，转换为拒绝，就会有拒绝的原因 reason。
- reson 和 value 会作为参数传递给 Promise 执行器函数当中的 resolve 和 reject 函数参数。

```javascript
const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_RESOLVE = "fulfilled";
const PROMISE_STATUS_REJECT = "reject";
class MyPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = null;
    this.reason = null;
    this.onResolveFns = [];
    this.onRejectFns = [];
    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          this.status = PROMISE_STATUS_RESOLVE;
          this.value = value;
        });
      }
    };
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          this.status = PROMISE_STATUS_REJECT;
          this.reason = reason;
        });
      }
    };
    executor(resolve, reject);
  }
}
```

### 二

```javascript
const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_RESOLVE = "fulfilled";
const PROMISE_STATUS_REJECT = "reject";
class MyPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = null;
    this.reason = null;
    this.onResolveFns = [];
    this.onRejectedFns = [];
    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          this.status = PROMISE_STATUS_RESOLVE;
          this.value = value;
          this.onResolveFns.forEach((f) => f(this.value));
        });
      }
    };
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          this.status = PROMISE_STATUS_REJECT;
          this.reason = reason;
          this.onRejectedFns.forEach((f) => f(this.reason));
        });
      }
    };
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      /* 支持单次 / 多次调用 */
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onResolveFns.push((value) => {
          const result = onFulfilled(value);
          resolve(result);
        });
        this.onRejectedFns.push((reason) => {
          const error = onRejected(reason);
          reject(error);
        });
      }
      /* 支持异步调用 */
      if (this.status === PROMISE_STATUS_RESOLVE) {
        const result = onFulfilled(value);
        resolve(result);
      }
      if (this.status === PROMISE_STATUS_REJECT) {
        const error = onFulfilled(value);
        reject(error);
      }
    });
  }
}
```

### 三

```javascript
const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_RESOLVE = "fulfilled";
const PROMISE_STATUS_REJECT = "reject";
class MyPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = null;
    this.reason = null;
    this.onResolveFns = [];
    this.onRejectedFns = [];
    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          this.status = PROMISE_STATUS_RESOLVE;
          this.value = value;
          this.onResolveFns.forEach((f) => f(this.value));
        });
      }
    };
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          this.status = PROMISE_STATUS_REJECT;
          this.reason = reason;
          this.onRejectedFns.forEach((f) => f(this.reason));
        });
      }
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      /* 支持单次 / 多次调用 */
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onResolveFns.push((value) => {
          try {
            const result = onFulfilled(value);
            resolve(result);
          } catch (err) {
            reject(err);
          }
          executorCatchError(value, resolve, onFulfilled, reject);
        });
        this.onRejectedFns.push((reason) => {
          try {
            const error = onRejected(reason);
            reject(error);
          } catch (err) {
            reject(err);
          }
          executorCatchError(reason, reject, onRejected, reject);
        });
      }
      /* 支持异步调用 */
      if (this.status === PROMISE_STATUS_RESOLVE) {
        try {
          const result = onFulfilled(this.value);
          resolve(result);
        } catch (err) {
          reject(err);
        }
        /* 公共代码提取 */
        executorCatchError(value, resolve, onFulfilled, reject);
      }
      if (this.status === PROMISE_STATUS_REJECT) {
        try {
          const error = onRejected(this.reason);
          reject(error);
        } catch (err) {
          reject(err);
        }
        executorCatchError(value, resolve, onFulfilled, reject);
      }
    });
  }
}
function executorCatchError(v, hanleStatusFn, onHandleStatusFn, reject) {
  try {
    const result = onHandleStatusFn(v);
    hanleStatusFn(result);
  } catch (err) {
    reject(err);
  }
}
```

### 四

```javascript
const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_RESOLVE = "fulfilled";
const PROMISE_STATUS_REJECT = "reject";
class MyPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = null;
    this.reason = null;
    this.onResolveFns = [];
    this.onRejectedFns = [];
    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          this.status = PROMISE_STATUS_RESOLVE;
          this.value = value;
          this.onResolveFns.forEach((f) => f(this.value));
        });
      }
    };
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          this.status = PROMISE_STATUS_REJECT;
          this.reason = reason;
          this.onRejectedFns.forEach((f) => f(this.reason));
        });
      }
    };
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    const currentPromise = new MyPromise((resolve, reject) => {
      /* 支持单次 / 多次调用 */
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onResolveFns.push((value) => {
          const result = onFulfilled(value);
          handleResultReturn(currentPromise, result, resolve, reject);
        });
        this.onRejectedFns.push((reason) => {
          const error = onRejected(reason);
          handleResultReturn(currentPromise, error, resolve, reject);
        });
      }
      /* 支持异步调用 */
      if (this.status === PROMISE_STATUS_RESOLVE) {
        const result = onFulfilled(value);
        handleResultReturn(currentPromise, result, resolve, reject);
      }
      if (this.status === PROMISE_STATUS_REJECT) {
        const error = onFulfilled(value);
        handleResultReturn(currentPromise, error, resolve, reject);
      }
    });
  }
}
function handleResultReturn(currentPromise, v, resolve, reject) {
  /* 循环引用 在当前then处理函数当中return当前promise */
  if (currentPromise === v) {
    return reject(new TypeError("chaining cycle detected for promise"));
  }

  if (v instanceof MyPromise) {
    /* 返回的是promise */
    if (v.status === PROMISE_STATUS_PENDIGN) {
      v.then(resolve, reject);
    }
    /* 返回的是对象，thenable或者普通对象 */
  } else if (v !== null && typeof v === "object") {
    let isCall = false;
    let then = null;
    try {
      then = v.then;
    } catch (error) {
      reject(error);
    }
    if (typeof then === "function") {
      then.call(
        v,
        (value) => {
          if (!isCall) {
            resolve(value);
            isCall = true;
          }
        },
        (reason) => {
          if (!isCall) {
            reject(reason);
            isCall = true;
          }
        }
      );
    } else {
      // 普通对象
      resolve(v);
    }
    // 普通值
  } else {
    resolve(v);
  }
}
```
