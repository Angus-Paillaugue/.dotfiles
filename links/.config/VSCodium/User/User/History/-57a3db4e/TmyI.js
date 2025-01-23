/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  let cache = new Map();
  return function(...args) {
    if(cache.has(args)) {
      return cache.get(args);
    }else {
      let result = fn(...args);
      cache.set(args, result);
      return result
    }
  }
}



let callCount = 0;
const memoizedFn = memoize(function (a, b) {
  callCount += 1;
  return a + b;
})
memoizedFn(2, 3) // 5
memoizedFn(2, 3) // 5
console.log(callCount) // 1
