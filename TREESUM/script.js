function treeSum(arr, index = 0) {
  if (index >= arr.length) return 0;
  let sum = 0;
  if (Array.isArray(arr[index])) {
    sum += treeSum(arr[index]);
  } else {
    sum += arr[index];
  }
  return sum + treeSum(arr, index + 1);
}

const arr = [5, 7, [4, [2], 8, [1, 3], 2], [9, []], 1, 8];
console.log(treeSum(arr));
