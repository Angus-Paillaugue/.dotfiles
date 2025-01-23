/**
 * @param {number[]} nums
 * @return {void}
 */
var ArrayWrapper = function(nums) {
  this.arrays = nums
};

/**
 * @return {number}
 */
ArrayWrapper.prototype.valueOf = function() {
  return this.arrays.reduce((acc, cur) => acc + cur, 0)
}

/**
 * @return {string}
 */
ArrayWrapper.prototype.toString = function() {
  return `[${this.arrays.join(',')}]`
}


const obj1 = new ArrayWrapper([1,2]);
const obj2 = new ArrayWrapper([3,4]);
console.log(obj1 + obj2);
console.log(String(obj1));
console.log(String(obj2));
