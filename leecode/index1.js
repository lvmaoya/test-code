// 编写一个函数来查找字符串数组中的最长公共前缀。

// 如果不存在公共前缀，返回空字符串 ""。

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs[0].length == 0) {
    return "";
  }
  let prefix = strs[0][0];
  for (let i = 0; i < strs[0].length - 1; i++) {
    for (let j = 0; j < strs.length; j++) {
      if (strs[j][i] != prefix) {
        return i == 0 ? "" : prefix;
      }
    }
    prefix = prefix + strs[0][i + 1];
  }
  return prefix;
};
console.log(longestCommonPrefix(["flower", "flow", "flight"]));

console.log(longestCommonPrefix(["dog", "racecar", "car"]));
