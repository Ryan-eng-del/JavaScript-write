// new
function _new(constructFn) {
  if (typeof constructFn !== "function") throw new TypeError(`${constructFn} is not a Function`);
  const obj = Object.create(constructFn.prototype);
  const result = constructFn.apply(obj, [...arguments].slice(1));
  const isFunction = typeof result === "function";
  const isObject = Object.prototype.toString.call(result) === "[Object object]";
  return isFunction || isObject ? result : obj;
}

// bind
function _bind(context) {
  if (typeof this !== "function") throw new Error("bind is a method of function");
  context = context || window;
  const self = this;
  const argsX = [].slice.call(arguments, 1);

  function bindFn() {
    const argsY = [].slice.call(arguments);
    self.call(this instanceof self ? this : context, argsX.contact(argsY));
  }

  function fCenter() {}
  bindFn.prototype = new fCenter();
  fCenter.prototype = self.prototype;
  return bindFn;
}

// call
Function.prototype._call = function (context) {
  if (typeof this !== "function") throw new Error("call is a method of function");
  context = context || window;
  context.fn = this;
  var args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push("arguments[" + i + "]");
  }
  var result = eval("context.fn(" + args + ")");
  delete context.fn;
  return result;
};

// apply
Function.prototype._apply = function (context, arr) {
  if (typeof this !== "function") throw new Error("apply is a method of function");
  context = context || window;
  context.fn = this;
  var args = [];
  var result;
  for (let i = 0; i < arr.length; i++) {
    args.push("arguments[" + i + "]");
  }
  if (!arr) {
    result = context.fn();
  } else {
    result = eval("context.fn(" + args + ")");
  }
  delete context.fn;
  return result;
};

// curry
function curry(fn) {
  return function subCurry(...argOut) {
    if (fn.length > argOut.length) {
      return function (...argIn) {
        return subCurry.apply(this, argOut.concat(argIn));
      };
    } else {
      return fn.apply(this, argOut);
    }
  };
}
