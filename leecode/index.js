// 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

// 返回容器可以储存的最大水量。

// 说明：你不能倾斜容器。

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
   let maxArea= 0;
   let left = 0;
   let right = height.length - 1;
   while(left < right){
        maxArea = Math.max(maxArea, (right - left) * Math.min(height[left],height[right]));
        if(height[left] < height[right]){
            left++;
        }else{
            right--;
        }
   }
   return maxArea;
};

// 解题思路：双指针法

// 1. 1.
//    核心思想 ：使用两个指针分别指向数组的开始和结束位置
// 2. 2.
//    面积计算 ：面积 = 宽度 × 高度，其中高度取两条线中较短的那条
// 3. 3.
//    指针移动策略 ：总是移动较短的那一边的指针
//    - 为什么？因为移动较长的一边不可能得到更大的面积（宽度减少，高度不变或变小）

// 测试用例
console.log("测试用例1:");
console.log("输入: [1,8,6,2,5,4,8,3,7]");
console.log("输出:", maxArea([1,8,6,2,5,4,8,3,7])); // 期望输出: 49

console.log("\n测试用例2:");
console.log("输入: [1,1]");
console.log("输出:", maxArea([1,1])); // 期望输出: 1

console.log("\n测试用例3:");
console.log("输入: [4,3,2,1,4]");
console.log("输出:", maxArea([4,3,2,1,4])); // 期望输出: 16

console.log("\n测试用例4:");
console.log("输入: [1,2,1]");
console.log("输出:", maxArea([1,2,1])); // 期望输出: 2

