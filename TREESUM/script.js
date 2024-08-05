function treeSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      sum += treeSum(arr[i]);
    } else {
      sum += arr[i];
    }
  }
  return sum;
}

const arr = [5, 7, [4, [2], 8, [1, 3], 2], [9, []], 1, 8];
console.log(treeSum(arr));
