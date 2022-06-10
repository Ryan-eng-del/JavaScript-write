```javascript
class MyPromise {
  static all(promises) {
    const result = [];
    return new MyPromise((resolve, reject) => {
      promises.forEach((p) => {
        p.then((v) => {
          result.push(v);
          if (result.length === promises.length) resolve(result);
        });
      }, reject);
    });
  }
  static race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((p) => {
        p.then((resolve, reject));
      });
    });
  }
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        return value;
      } else {
        resolve(value);
      }
    });
  }
  static reject(reason) {
    return new MyPromise((resovle, reject) => {
      if (reason instanceof MyPromise) {
        return reason;
      } else {
        reject(reason);
      }
    });
  }
  static any(promises) {
    const reasons = [];
    return new MyPromise((resolve, reject) => {
      promises.then(resolve, (reason) => {
        reasons.push(reason);
        if (reasons.length == promises.length) {
          reject(new AggregateError(reasons));
        }
      });
    });
  }
  static allSettled(promises) {
    const results = [];
    return new MyPromise((resolve, reject) => {
      promises.forEach((p) => {
        p.then(
          (value) => {
            results.push({ satus: "fulfilled", value });
            if (promises.length === results.length) {
              resolve(results);
            }
          },
          (reason) => {
            results.push({ satus: "rejected", value: reason });
            if (promises.length === results.length) {
              resolve(results);
            }
          }
        );
      });
    });
  }
  finally(onFinally) {
    this.then(onFinally, onFinally);
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
```
