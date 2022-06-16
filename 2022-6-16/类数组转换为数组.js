function toArray() {
  // 1
  const arg1 = [...arguments];
  // 2
  const arg2 = [].slice.call(arguments);
  const arg2_2 = Array.prototype.slice.call(arguments);
  // 3
  const arg3 = Array.from(arguments);
  // 4
  const arg4 = [];
  for (let i = 0; i < arguments.length; i++) {
    arg4.push(arguments[i]);
  }
}
